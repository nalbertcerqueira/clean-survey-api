import { createConnection, Connection } from "mysql2/promise"
import { DataSource } from "typeorm"

export class MysqlDataSourceDecorator {
    private readonly _dataSource: DataSource

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource
    }

    private async createTemporaryConnection(): Promise<Connection> {
        const connection = await createConnection({
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT as string) || 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        })

        return connection
    }

    public async initialize(): Promise<DataSource> {
        const temporaryConnection = await this.createTemporaryConnection()
        await temporaryConnection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`)
        await temporaryConnection.end()
        await this.dataSource.initialize()
        return this.dataSource
    }

    public get dataSource(): DataSource {
        return this._dataSource
    }
}
