import {
    AddSurveyRepository,
    SurveyWithoutId
} from "@domain/repositories/survey/addSurveyRepository"
import { mysqlDataSource } from "../../config"
import { SurveyAnswerORMEntity } from "../../models/surveyAnswerModel"
import { SurveyORMEntity } from "../../models/surveyModel"
import { ulid, ulidToUUID } from "ulidx"
import { GetSurveysRepository } from "@domain/repositories/survey/getSurveysRepository"
import { ISurvey } from "@domain/entities/survey"
import { FindSurveyByIdRepository } from "@domain/repositories/survey/findSurveyByIdRepository"

export class MysqlSurveyRepository
    implements AddSurveyRepository, GetSurveysRepository, FindSurveyByIdRepository
{
    public async add(survey: SurveyWithoutId): Promise<void> {
        const surveyRepository = mysqlDataSource.dataSource.getRepository(SurveyORMEntity)

        const answers = survey.answers.map(({ id, answer, image }) => {
            const entity = new SurveyAnswerORMEntity()
            entity.id = id
            entity.answer = answer
            entity.image = image
            return entity
        })

        const newSurvey = new SurveyORMEntity()
        newSurvey.id = ulidToUUID(ulid())
        newSurvey.question = survey.question
        newSurvey.answers = answers

        await surveyRepository.save(newSurvey, { reload: false })
    }

    public async getAll(): Promise<ISurvey[]> {
        const surveyRepository = mysqlDataSource.dataSource.getRepository(SurveyORMEntity)

        const surveys: ISurvey[] = await surveyRepository.find({
            relations: { answers: true },
            select: {
                id: true,
                question: true,
                createdAt: true,
                answers: { id: true, answer: true, image: true }
            }
        })

        return surveys
    }

    public async findById(surveyId: string): Promise<ISurvey | null> {
        const surveyRepository = mysqlDataSource.dataSource.getRepository(SurveyORMEntity)

        const survey: ISurvey | null = await surveyRepository.findOne({
            relations: { answers: true },
            where: { id: surveyId },
            select: {
                id: true,
                question: true,
                createdAt: true,
                answers: { id: true, answer: true, image: true }
            }
        })

        return survey
    }
}
