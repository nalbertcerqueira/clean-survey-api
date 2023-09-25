export type ValidationResult = { isValid: true } | { isValid: false; errors: string[] }

//Abstração de um serviço de validação de schemas
export interface SchemaValidatorService {
    validate(data: Record<string, any>): Promise<ValidationResult>
}
