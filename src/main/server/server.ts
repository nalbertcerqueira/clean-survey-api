import { setupExpressConfig } from "./config/express-config"
import { applyApiRoutes } from "./routes/index"
import { mongoHelper } from "@infra/db/mongo/config/mongodb-config"
import dotenv from "dotenv"
import express from "express"

dotenv.config()

const port = process.env.PORT || process.env.DEV_PORT
const server = setupExpressConfig(express())

mongoHelper
    .connect()
    .then(() => applyApiRoutes(server))
    .then(() => server.listen(port, () => console.log(`server running on port ${port}`)))
    .catch((error) => console.error(error))
