export interface Headers {
    [key: string]: string | undefined
}

export interface Params {
    [key: string]: string
}

//Abstração do objeto responsável por armazenar informações
//que persistem durante o ciclo de uma requisição
export interface Locals {
    [key: string]: any
}

//Abstração para uma  requisição http padrão
export interface HttpRequest {
    params?: Params
    headers?: Headers
    locals?: Locals
    body?: any
}

//Abstração para uma resposta http padrão
export interface HttpResponse {
    headers?: Headers
    statusCode: number
    body?: any
    errors?: string[]
}
