export class InvalidTypeError extends Error {
    constructor(paramName: string, type: string) {
        super(`Parameter '${paramName}' must be a ${type}`)
        this.name = "InvalidTypeError"
    }
}
