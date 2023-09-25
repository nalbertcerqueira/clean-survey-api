import { HttpRequest, Middleware } from "@presentation/protocols"
import { NextFunction, Request, Response } from "express"

//Adaptador para converter um Middleware em uma interface aceita pelo express
export function expressMiddlewareAdapter(controller: Middleware) {
    return async function (req: Request, res: Response, next: NextFunction) {
        const httpRequest: HttpRequest = {
            headers: req.headers as { [key: string]: string }
        }
        const { statusCode, headers, ...responseRest } = await controller.handle(httpRequest)

        if (headers) {
            const headerEntries = Object.entries({ ...headers })
            for (const [key, value] of headerEntries) {
                value && res.setHeader(key, value)
            }
        }

        if (statusCode >= 200 && statusCode <= 299) {
            const { accountId } = responseRest.body
            accountId ? (res.locals.accountId = accountId) : null
            return next()
        }

        return res.status(statusCode).json(responseRest)
    }
}
