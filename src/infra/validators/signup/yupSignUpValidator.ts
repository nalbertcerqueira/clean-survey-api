import { SchemaValidatorService, SignupData, ValidationResult } from "./protocols"
import { ObjectSchema, ValidateOptions, object, ref, string } from "../config/yup-config"
import { MismatchParamError } from "@presentation/errors/index"

//Implementação do validador de schemas para os dados de cadastro de um usuário
export class YupSignUpValidator implements SchemaValidatorService {
    private readonly signUpSchema: ObjectSchema<SignupData>

    constructor() {
        const passwordsMismatch = new MismatchParamError("password", "password confirmation")
        this.signUpSchema = object({
            name: string().defined().min(4),
            role: string().optional().oneOf(["admin"]),
            email: string().defined().min(8).email(),
            password: string().defined().min(6),
            passwordConfirmation: string()
                .defined()
                .min(6)
                .oneOf([ref("password")], passwordsMismatch.message)
        }).noUnknown()
    }

    public async validate(data: Record<string, any>): Promise<ValidationResult> {
        const validationOptions: ValidateOptions = { abortEarly: false, strict: true }
        try {
            await this.signUpSchema.validate(data, validationOptions)
            return { isValid: true }
        } catch (error: any) {
            return { isValid: false, errors: error.errors || [error.message] }
        }
    }
}
