import { createConnection, Connection } from "mysql2/promise"
import { DataSource } from "typeorm"

export const uuidTransformer = {
    to: UUIDtoBinary,
    from: binaryToUUID
}

export const intTransformer = {
    to: (value: string): number => Math.abs(Math.trunc(parseInt(value))),
    from: (value: number): string => `${value}`
}

//O undefined é usado pois o typeorm utiliza left-joins para criar relações ao
//usar {relation: {...}}. Por isso é necessário considerar casos nos quais não existem registros
export function UUIDtoBinary(uuid?: string): Buffer | undefined {
    return uuid ? Buffer.from(uuid.replace(/-/g, ""), "hex") : undefined
}

//O undefined é usado pois o typeorm utiliza left-joins para criar relações ao
//usar {relation: {...}}. Por isso é necessário considerar casos nos quais não existem registros
export function binaryToUUID(bin?: Buffer): string | undefined {
    if (!bin) {
        return undefined
    }
    return `${bin.toString("hex", 0, 4)}-${bin.toString("hex", 4, 6)}-${bin.toString(
        "hex",
        6,
        8
    )}-${bin.toString("hex", 8, 10)}-${bin.toString("hex", 10, 16)}`
}

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
