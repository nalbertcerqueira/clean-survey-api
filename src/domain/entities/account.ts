//Representação da conta de um usuário
export interface IAccount {
    readonly id: string
    name: string
    role?: string
    email: string
    password: string
}
