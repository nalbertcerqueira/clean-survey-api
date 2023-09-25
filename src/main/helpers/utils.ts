import fs from "fs/promises"
import path from "path"

//Retornando um array de caminhos de arquivos que satisfazem o padrão (pattern) passado
//como parâmetro
export async function getFilePaths(rootPath: string, pattern: RegExp): Promise<string[]> {
    const targetPaths: string[] = []

    //Atravessando diretórios de forma recursiva para buscar arquivos
    //cujos caminhos satisfazem o parâmetro 'pattern'
    async function transverseDirectory(rootPath: string): Promise<void> {
        const dirents = await fs.readdir(rootPath, { withFileTypes: true, encoding: "utf-8" })

        for (const dirent of dirents) {
            const currentPath = path.resolve(rootPath, dirent.name)
            if (dirent.isDirectory()) await transverseDirectory(currentPath)
            if (dirent.isFile() && currentPath.match(pattern)) targetPaths.push(currentPath)
        }
    }

    await transverseDirectory(rootPath)
    return targetPaths
}
