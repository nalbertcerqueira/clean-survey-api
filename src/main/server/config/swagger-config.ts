import { serve, setup } from "swagger-ui-express"
import express, { Router } from "express"
import { swaggerDoc } from "@main/docs/swagger/index"

export const swaggerMiddleware = (path: string): Router => {
    const swaggerRouter = express.Router()
    swaggerRouter.use(path, serve)
    swaggerRouter.use(path, setup(swaggerDoc))
    return swaggerRouter
}
