import {
    badRequest,
    notFound,
    serverError,
    unauthorizedCredentials,
    unauthorizedLogin,
    conflictingEmails
} from "./responses/index"

export const swaggerResponses = {
    BadRequest: badRequest,
    NotFound: notFound,
    UnauthorizedLogin: unauthorizedLogin,
    UnauthorizedCredentials: unauthorizedCredentials,
    ConflictEmails: conflictingEmails,
    ServerError: serverError
}
