//Representação da conta de um usuário
export interface IAccount {
    readonly id: string
    name: string
    role: "user" | "admin"
    email: string
    password: string
}
