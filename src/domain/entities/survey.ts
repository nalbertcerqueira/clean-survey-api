//Representação dos dados de um enquete
export interface ISurvey {
    readonly id: string
    question: string
    answers: ISurveyAnswer[]
    readonly createdAt: Date
}

//Representação da resposta de uma enquete
export interface ISurveyAnswer {
    readonly id: string
    image?: string
    answer: string
}

export class SurveyAnswer implements ISurveyAnswer {
    public readonly id: string
    public answer: string
    public image?: string

    constructor(props: { answer: string; id: string; image?: string }) {
        this.id = props.id
        this.answer = props.answer
        this.image = props.image
    }
}
