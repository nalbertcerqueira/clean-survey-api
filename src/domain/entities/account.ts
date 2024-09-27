//Representação da conta de um usuário

export type Role = "user" | "admin"

export interface IAccount {
    readonly id: string
    name: string
    role: Role
    email: string
    password: string
}
