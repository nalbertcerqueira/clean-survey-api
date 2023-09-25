//Representação do registro de uma enquete respondida por um usuário
export interface ISurveyResultRegistry {
    readonly id: string
    readonly updatedAt: number
    accountId: string
    surveyId: string
    answerId: string
}

//Representação do resultado de uma enquete
export interface ISurveyResult {
    readonly id: string
    readonly createdAt: number
    question: string
    totalCount: number
    answers: ISurveyResultAnswer[]
}

export interface ISurveyResultAnswer {
    readonly id: string
    image?: string
    answer: string
    count: number
    percent: number
}
