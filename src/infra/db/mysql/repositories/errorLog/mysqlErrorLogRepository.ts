import { LogErrorRepository } from "@domain/repositories/error/logErrorRepository"
import { mysqlDataSource } from "../../config"
import { ErrorORMEntity } from "../../models/errorModel"
import { Repository } from "typeorm"

export class MysqlErrorLogRepository implements LogErrorRepository {
    private readonly repository: Repository<ErrorORMEntity>

    constructor() {
        this.repository = mysqlDataSource.dataSource.getRepository(ErrorORMEntity)
    }

    public async log(errorStack: string): Promise<void> {
        const error = new ErrorORMEntity()
        error.stack = errorStack

        await this.repository.save(error, { reload: false })
    }
}
