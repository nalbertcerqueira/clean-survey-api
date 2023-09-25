export class InvalidParamError extends Error {
    constructor(paramName: string, expectedFormat: string) {
        super(`Parameter '${paramName}' is not a valid ${expectedFormat}`)
        this.name = "InvalidParamError"
    }
}
