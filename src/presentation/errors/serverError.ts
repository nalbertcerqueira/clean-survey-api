export class ServerError extends Error {
    constructor(error: Error) {
        super(error.message)
        this.name = "ServerError"
    }
}
