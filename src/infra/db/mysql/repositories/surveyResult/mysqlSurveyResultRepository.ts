import {
    ResultRegistry,
    UpdateSurveyResultRepository
} from "@domain/repositories/surveyResult/updateSurveyResultRepository"
import { ulidToUUID } from "ulidx"
import { mysqlDataSource } from "../../config"
import { SurveyResponseORMEntity } from "../../models/surveyResponseModel"
import { DeleteSurveyResultRepository } from "@domain/repositories/surveyResult/deleteSurveyResultRepository"
import { FindSurveyResultByIdRepository } from "@domain/repositories/surveyResult/findSurveyResultByIdRepository"
import { ISurveyResult, ISurveyResultRegistry } from "@domain/entities/surveyResult"

export class MysqlSurveyResultRepository
    implements
        UpdateSurveyResultRepository,
        DeleteSurveyResultRepository,
        FindSurveyResultByIdRepository
{
    public async update(resultRegistry: ResultRegistry): Promise<void> {
        const { accountId, answerId, surveyId } = resultRegistry
        const surveyResultRepository =
            mysqlDataSource.dataSource.getRepository(SurveyResponseORMEntity)

        await surveyResultRepository.save(
            { accountId: ulidToUUID(accountId), surveyId, answerId },
            { reload: false }
        )
    }

    public async delete(
        surveyId: string,
        accountId: string
    ): Promise<ISurveyResultRegistry | null> {
        const queryRunner = mysqlDataSource.dataSource.createQueryRunner()
        const accountUuid = ulidToUUID(accountId)
        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            const response = await queryRunner.manager.findOne(SurveyResponseORMEntity, {
                select: { answerId: true, createdAt: true },
                where: { accountId: accountUuid, surveyId },
                lock: { mode: "pessimistic_read" }
            })

            if (!response) {
                await queryRunner.commitTransaction()
                return null
            }

            const { answerId, createdAt } = response
            await queryRunner.manager.delete(SurveyResponseORMEntity, {
                surveyId,
                accountId: accountUuid
            })
            await queryRunner.commitTransaction()

            return { accountId, surveyId, answerId, createdAt: createdAt }
        } catch (error) {
            await queryRunner.rollbackTransaction()
            throw error
        } finally {
            await queryRunner.release()
        }
    }

    public async findBySurveyId(surveyId: string): Promise<ISurveyResult | null> {
        const answerStatisticQuery = mysqlDataSource.dataSource
            .createQueryBuilder()
            .select([
                "survey.id AS id",
                "survey.question AS question",
                "survey.createdAt AS createdAt",
                "CAST(surveyAnswer.id AS CHAR) AS answerId",
                "surveyAnswer.answer AS answer",
                "surveyAnswer.image AS image",
                "COUNT(DISTINCT surveyResponse.accountId) AS count",
                "SUM(COUNT(DISTINCT surveyResponse.accountId)) OVER(PARTITION BY survey.id) AS totalCount"
            ])
            .from("survey", "survey")
            .innerJoin("survey.answers", "surveyAnswer")
            .leftJoin("surveyAnswer.responses", "surveyResponse")
            .where("survey.id = UUID_TO_BIN(:surveyId)", { surveyId })
            .groupBy("survey.id, surveyAnswer.id")

        const surveyResultQuery = mysqlDataSource.dataSource
            .createQueryBuilder()
            .select([
                "BIN_TO_UUID(id) AS id",
                "question",
                "ANY_VALUE(totalCount) AS totalCount",
                "createdAt",
                "JSON_ARRAYAGG(JSON_OBJECT('id', answerId, 'answer', answer, 'image', image, 'count', count, 'percent', IFNULL(ROUND(count*100/totalCount, 2), 0))) AS answers"
            ])
            .from(`(${answerStatisticQuery.getQuery()})`, "answerStatistic")
            .setParameters(answerStatisticQuery.getParameters())
            .groupBy("answerStatistic.id")

        const surveyResult = await surveyResultQuery.getRawOne<ISurveyResult>()
        return surveyResult ?? null
    }
}
