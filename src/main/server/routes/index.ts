import { getFilePaths } from "@main/helpers/utils"
import { Express } from "express"
import path from "path"

//Função responsável por injetar todos os 'Routers' no express de forma
//dinâmica
export async function applyApiRoutes(server: Express): Promise<void> {
    const srcDirectory = path.resolve(__dirname, "../../../main")
    const routerPaths = await getFilePaths(srcDirectory, /(router|Router).(js|ts)$/)
    routerPaths.map(async (path) => server.use("/api", (await import(`${path}`)).default))
}
