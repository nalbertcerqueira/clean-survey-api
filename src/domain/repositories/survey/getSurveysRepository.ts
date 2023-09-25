import { ISurvey } from "@domain/entities/survey"

//Abstração para buscar todas as enquetes de um repositório
export interface GetSurveysRepository {
    getAll(): Promise<ISurvey[]>
}
