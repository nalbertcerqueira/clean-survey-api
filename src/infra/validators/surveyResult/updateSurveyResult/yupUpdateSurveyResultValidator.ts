import { SurveyResultData, SchemaValidatorService, ValidationResult } from "./protocols"
import { ObjectSchema, object, string, ValidateOptions } from "../../config/yup-config"

//Validando os dados enviados pelo usuário para responder uma enquete
export class YupUpdateSurveyResultValidator implements SchemaValidatorService {
    private readonly surveyResultSchema: ObjectSchema<SurveyResultData>

    constructor() {
        this.surveyResultSchema = object({
            answerId: string().defined()
        }).noUnknown()
    }

    async validate(data: Record<string, any>): Promise<ValidationResult> {
        const validationOptions: ValidateOptions = { abortEarly: false, strict: true }
        try {
            await this.surveyResultSchema.validate(data, validationOptions)
            return { isValid: true }
        } catch (error: any) {
            return { isValid: false, errors: error.errors }
        }
    }
}
