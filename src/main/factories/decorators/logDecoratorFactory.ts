import { MongoErrorRepository } from "@infra/db/mongo/repositories/error/mongoErrorRepository"
import { LogControllerDecorator } from "@presentation/decorators/logControllerDecorator"
import { Controller } from "@presentation/protocols"

export function makeLogControllerDecorator(controller: Controller): LogControllerDecorator {
    const mongoErrorRepository = new MongoErrorRepository()
    return new LogControllerDecorator(controller, mongoErrorRepository)
}
