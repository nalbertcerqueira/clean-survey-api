import { mongoHelper } from "@infra/db/mongo/config/mongodb-config"
import { QueryBuilder } from "@infra/helpers/queryBuilder"
import { ObjectId } from "mongodb"
import {
    UpdateSurveyResultRepository,
    ResultRegistry,
    ISurveyResult,
    ISurveyResultRegistry,
    FindSurveyResultByIdRepository,
    DeleteSurveyResultRepository
} from "./protocols"

export class MongoSurveyResultRepository
    implements
        UpdateSurveyResultRepository,
        FindSurveyResultByIdRepository,
        DeleteSurveyResultRepository
{
    public async update(resultRegistry: ResultRegistry): Promise<void> {
        await mongoHelper.connect()

        const { accountId, surveyId, answerId } = resultRegistry
        const surveyResultCollection = mongoHelper.db.collection("surveyResults")

        await surveyResultCollection.findOneAndUpdate(
            { accountId, surveyId },
            { $set: { answerId, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
            { projection: { updatedAt: 0 }, upsert: true }
        )
    }

    public async findBySurveyId(surveyId: string): Promise<ISurveyResult | null> {
        await mongoHelper.connect()

        try {
            new ObjectId(surveyId)
        } catch {
            return null
        }

        const queryBuilder = new QueryBuilder()
        const surveyCollection = mongoHelper.db.collection("surveys")
        const surveyIncludedFields = { id: 1, question: 1, createdAt: 1 }

        const aggregationPipeline = queryBuilder
            .match({
                _id: new ObjectId(surveyId)
            })
            .addFields({
                id: { $toString: "$_id" }
            })
            .lookUp({
                from: "surveyResults",
                localField: "id",
                foreignField: "surveyId",
                as: "results"
            })
            .project({
                ...surveyIncludedFields,
                _id: 0,
                totalCount: { $size: "$results" },
                answers: queryBuilder.map("$answers", "answer", {
                    $mergeObjects: [
                        "$$answer",
                        {
                            count: {
                                $size: queryBuilder.filter("$results", "result", {
                                    $eq: ["$$answer.id", "$$result.answerId"]
                                })
                            }
                        }
                    ]
                })
            })
            .set(
                "answers",
                queryBuilder.map("$answers", "answer", {
                    $mergeObjects: [
                        "$$answer",
                        {
                            percent: {
                                $cond: [
                                    { $eq: ["$totalCount", 0] },
                                    0,
                                    queryBuilder.round(
                                        queryBuilder.percentage("$$answer.count", "$totalCount"),
                                        1
                                    )
                                ]
                            }
                        }
                    ]
                })
            )
            .set("answers", {
                $sortArray: { input: "$answers", sortBy: { percent: -1 } }
            })
            .build()

        const surveyResults = await surveyCollection
            .aggregate<ISurveyResult>(aggregationPipeline)
            .toArray()

        return surveyResults[0] || null
    }

    public async delete(
        surveyId: string,
        accountId: string
    ): Promise<ISurveyResultRegistry | null> {
        await mongoHelper.connect()

        const surveyResultCollection =
            mongoHelper.db.collection<ISurveyResultRegistry>("surveyResults")
        const deletedRegistry = await surveyResultCollection.findOneAndDelete(
            { surveyId, accountId },
            { projection: { updatedAt: 0 } }
        )

        return deletedRegistry.value
    }
}
