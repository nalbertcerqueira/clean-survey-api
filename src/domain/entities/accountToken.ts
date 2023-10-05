//Representação de um token de um usuário
export interface IAccountToken {
    readonly id: string
    accountId: string
    tokenName: "accessToken"
    tokenValue: string
}
