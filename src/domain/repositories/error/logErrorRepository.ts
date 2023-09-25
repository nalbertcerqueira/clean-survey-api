//Abstração para salvar logs de erros em um repositório
export interface LogErrorRepository {
    log(errorStack: string): Promise<void>
}
