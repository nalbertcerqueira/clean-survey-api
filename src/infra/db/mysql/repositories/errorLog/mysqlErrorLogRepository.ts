import { LogErrorRepository } from "@domain/repositories/error/logErrorRepository"
import { mysqlDataSource } from "../../config"
import { ErrorORMEntity } from "../../models/errorModel"

export class MysqlErrorLogRepository implements LogErrorRepository {
    public async log(errorStack: string): Promise<void> {
        const errorRepository = mysqlDataSource.dataSource.getRepository(ErrorORMEntity)

        const error = new ErrorORMEntity()
        error.stack = errorStack

        await errorRepository.save(error, { reload: false })
    }
}
