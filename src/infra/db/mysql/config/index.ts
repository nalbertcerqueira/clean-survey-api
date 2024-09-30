import "reflect-metadata"
import dotenv from "dotenv"
import { DataSource } from "typeorm"
import { ErrorORMEntity } from "../models/errorModel"
import { SurveyORMEntity } from "../models/surveyModel"
import { AccountORMEntity } from "../models/accountModel"
import { AccountTokenORMEntity } from "../models/accountTokenModel"
import { SurveyAnswerORMEntity } from "../models/surveyAnswerModel"
import { SurveyResponseORMEntity } from "../models/surveyResponseModel"
import { MysqlDataSourceDecorator } from "../helpers"

dotenv.config()

const entities = [
    AccountORMEntity,
    AccountTokenORMEntity,
    SurveyORMEntity,
    SurveyAnswerORMEntity,
    SurveyResponseORMEntity,
    ErrorORMEntity
]

const ORMDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string) || 3306,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    entities: entities,
    synchronize: process.env.ORM_SYNC === "true",
    logging: false,
    poolSize: parseInt(process.env.DB_POOL_SIZE as string) || 1,
    entitySkipConstructor: true,
    extra: {
        connectionLimit: parseInt(process.env.DB_POOL_LIMIT as string) || 1,
        maxIdle: parseInt(process.env.DB_POOL_LIMIT as string) || 1,
        queueLimit: 0,
        idleTimeout: 60000,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0
    }
})

export const mysqlDataSource = new MysqlDataSourceDecorator(ORMDataSource)
