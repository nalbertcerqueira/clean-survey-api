import { mongoHelper } from "@infra/db/mongo/config/mongodb-config"
import {
    FindSurveyByIdRepository,
    GetSurveysRepository,
    AddSurveyRepository,
    SurveyWithoutId,
    FoundSurvey,
    FindOptions,
    ISurvey
} from "./protocols"
import { ObjectId } from "mongodb"

export class MongoSurveyRepository
    implements AddSurveyRepository, GetSurveysRepository, FindSurveyByIdRepository
{
    public async add(survey: SurveyWithoutId): Promise<void> {
        await mongoHelper.connect()

        const surveyCollection = mongoHelper.db.collection("surveys")
        await surveyCollection.insertOne(
            { ...survey, createdAt: Date.now(), updatedAt: Date.now() },
            { ignoreUndefined: true }
        )
    }

    public async getAll(): Promise<ISurvey[]> {
        await mongoHelper.connect()

        const surveyCollection = mongoHelper.db.collection("surveys")
        const mongoSurveys = await surveyCollection
            .find<FoundSurvey>({}, { projection: { updatedAt: 0 } })
            .toArray()

        return mongoSurveys.map(({ _id, ...surveyRest }) => ({
            id: _id.toString(),
            ...surveyRest
        }))
    }

    public async findById(surveyId: string): Promise<ISurvey | null> {
        try {
            new ObjectId(surveyId)
        } catch {
            return null
        }
        await mongoHelper.connect()

        const surveyCollection = mongoHelper.db.collection("surveys")
        const query = { _id: new ObjectId(surveyId) }
        const findOptions: FindOptions = { projection: { updatedAt: 0 } }

        const foundSurvey = await surveyCollection.findOne<FoundSurvey>(query, findOptions)
        if (foundSurvey) {
            const { _id, ...foundSurveyRest } = foundSurvey
            return { id: _id.toString(), ...foundSurveyRest }
        }

        return null
    }
}
