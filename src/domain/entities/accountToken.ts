//Representação de um registro dos tokens de um usuário
export interface IAccountToken {
    readonly id: string
    accountId: string
    accessToken: string
}
