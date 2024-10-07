import dotenv from "dotenv"
import express from "express"
import { setupExpressConfig } from "./config/express-config"
import { applyApiRoutes } from "./routes/index"
import { mysqlDataSource } from "@infra/db/mysql/config"

dotenv.config()

const port = process.env.PORT || process.env.DEV_PORT
const server = setupExpressConfig(express())

mysqlDataSource
    .initialize()
    .then(() => console.log("MySQL connected with success!"))
    .then(() => applyApiRoutes(server))
    .then(() => server.listen(port, () => console.log(`server running on port ${port}`)))
    .catch(async (error) => {
        await mysqlDataSource.destroy()
        console.error(error)
    })
