//Representação de um token de um usuário

export type ITokenName = "accessToken"

export interface IAccountToken {
    accountId: string
    name: ITokenName
    value: string
}
