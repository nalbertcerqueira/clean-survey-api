import { corsMiddleware } from "./cors-config"
import { helmetMiddleware } from "./helmet-config"
import { swaggerMiddleware } from "./swagger-config"
import express, { Express } from "express"

export function setupExpressConfig(serverInstance: Express) {
    serverInstance.use(helmetMiddleware())
    serverInstance.use(express.json())
    serverInstance.use(express.urlencoded({ extended: true }))
    serverInstance.use(swaggerMiddleware("/api-docs"))
    serverInstance.use(corsMiddleware())

    return serverInstance
}
