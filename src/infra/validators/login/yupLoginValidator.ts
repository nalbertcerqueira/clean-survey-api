import { LoginData, SchemaValidatorService, ValidationResult } from "./protocols"
import { ObjectSchema, ValidateOptions, object, string } from "@infra/validators/config/yup-config"

//Implementação do validador de schemas para os dados vindos durante o login
export class YupLoginValidator implements SchemaValidatorService {
    private readonly loginSchema: ObjectSchema<LoginData>

    constructor() {
        this.loginSchema = object({
            email: string().defined().email().min(8),
            password: string().defined().min(6)
        }).noUnknown()
    }

    public async validate(data: Record<string, any>): Promise<ValidationResult> {
        const validationOptions: ValidateOptions = { strict: true, abortEarly: false }
        try {
            await this.loginSchema.validate(data, validationOptions)
            return { isValid: true }
        } catch (error: any) {
            return { isValid: false, errors: error.errors || [error.message] }
        }
    }
}
