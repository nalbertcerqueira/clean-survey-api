import { ServerError } from "@presentation/errors/index"
import { Headers, HttpResponse } from "@presentation/protocols/index"
import { UnauthorizedError } from "@presentation/errors/unauthorizedError"
import { NotFoundError } from "@presentation/errors/notFoundError"

export function badRequest(errors: string[]): HttpResponse {
    return { statusCode: 400, errors }
}

export function notFound(message: string): HttpResponse {
    return { statusCode: 404, errors: [new NotFoundError(message).message] }
}

export function unauthorized(message?: string, headers?: Headers): HttpResponse {
    return { statusCode: 401, headers: headers, errors: [new UnauthorizedError(message).message] }
}

export function serverError(error: Error): HttpResponse {
    return { statusCode: 500, errors: [new ServerError(error).message], body: error }
}

export function conflict(errors: string[]): HttpResponse {
    return { statusCode: 409, errors }
}

export function success(body: any): HttpResponse {
    return { statusCode: 200, body }
}

export function created(): HttpResponse {
    return { statusCode: 201, body: null }
}
