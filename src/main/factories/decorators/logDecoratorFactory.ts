import { MysqlErrorLogRepository } from "@infra/db/mysql/repositories/errorLog/mysqlErrorLogRepository"
import { LogControllerDecorator } from "@presentation/decorators/logControllerDecorator"
import { Controller } from "@presentation/protocols"

export function makeLogControllerDecorator(controller: Controller): LogControllerDecorator {
    const mysqlErrorLogRepository = new MysqlErrorLogRepository()
    return new LogControllerDecorator(controller, mysqlErrorLogRepository)
}
