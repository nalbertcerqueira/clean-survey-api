//Representação do registro de uma enquete respondida por um usuário
export interface ISurveyResultRegistry {
    accountId: string
    surveyId: string
    answerId: string
    readonly createdAt: Date
}

//Representação do resultado de uma enquete
export interface ISurveyResult {
    readonly id: string
    question: string
    totalCount: number
    answers: ISurveyResultAnswer[]
    readonly createdAt: Date
}

export interface ISurveyResultAnswer {
    readonly id: string
    image?: string
    answer: string
    count: number
    percent: number
}
