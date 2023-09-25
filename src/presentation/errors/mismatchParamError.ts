export class MismatchParamError extends Error {
    constructor(paramName: string, paramNameToMatch: string) {
        super(`Parameters '${paramName}' and '${paramNameToMatch}' do not match`)
        this.name = "MismatchParamError"
    }
}
