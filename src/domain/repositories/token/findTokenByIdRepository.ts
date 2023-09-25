//Abstração da operação de encontrar um token do usuário
export interface FindTokenByIdRepository {
    findByAccountId(accountId: string, tokenName: "accessToken"): Promise<string | null>
}
