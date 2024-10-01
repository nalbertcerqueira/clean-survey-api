import { SchemaValidatorService, SurveyData, ValidationResult } from "./protocols"
import { ObjectSchema, ValidateOptions, array, object, string } from "../../config/yup-config"

//Validador de schemas para os dados de criação de uma enquete
export class YupCreateSurveyValidator implements SchemaValidatorService {
    private readonly SurveySchema: ObjectSchema<SurveyData>
    constructor() {
        const answerSchema = object({
            answer: string().defined().min(6).max(100),
            image: string().url().max(512)
        }).noUnknown()

        this.SurveySchema = object({
            question: string().defined().min(8),
            answers: array().of(answerSchema.defined().noUnknown()).defined().min(1)
        }).noUnknown()
    }

    public async validate(data: Record<string, any>): Promise<ValidationResult> {
        const validationOptions: ValidateOptions = { strict: true, abortEarly: false }
        try {
            await this.SurveySchema.validate(data, validationOptions)
            return { isValid: true }
        } catch (error: any) {
            return { isValid: false, errors: error.errors || [error.message] }
        }
    }
}
