//Representação da conta de um usuário

export type IRole = "user" | "admin"

export interface IAccount {
    readonly id: string
    name: string
    role: IRole
    email: string
    password: string
}
