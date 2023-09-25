import { Controller, HttpRequest } from "@presentation/protocols"
import { Request, Response } from "express"

//Adaptador para converter um Controller em uma interface aceita pelo express
export function expressControllerAdapter(controller: Controller) {
    return async function (req: Request, res: Response) {
        const httpRequest: HttpRequest = {
            body: req.body,
            params: req.params,
            locals: res.locals
        }

        const { statusCode, headers, ...responseRest } = await controller.handle(httpRequest)
        const headerKeys = Object.keys({ ...headers })

        if (headers) {
            headerKeys.map((key) => {
                const value = headers[key]
                value && res.setHeader(key, value)
            })
        }

        return res.status(statusCode).json(responseRest)
    }
}
