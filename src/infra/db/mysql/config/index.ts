import "reflect-metadata"
import dotenv from "dotenv"
import { DataSource } from "typeorm"
import { MysqlDataSourceDecorator } from "../helpers"

dotenv.config()

const ORMDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string) || 3306,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
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
