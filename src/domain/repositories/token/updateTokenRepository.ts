//Abstração para a operação de atualizar o token de um usuário no repositório
export interface UpdateTokenRepository {
    update(accountId: string, token: string, tokenName: "accessToken"): Promise<void>
}
