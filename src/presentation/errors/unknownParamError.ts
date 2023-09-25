export class UnknownParamError extends Error {
    constructor(paramNames: string) {
        super(`The following parameters are not allowed: ${paramNames}`)
        this.name = "UnknownParamError"
    }
}
