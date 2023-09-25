export interface LengthParams {
    min?: string | number
    max?: string | number
}

export class InvalidLengthError extends Error {
    constructor(paramName: string, { min, max }: LengthParams) {
        const defaultMessage = `Parameter '${paramName}' must be `
        const maxLengthMessage = max ? `no more than ${max} characters` : ""
        const minLengthMessage = min ? `at least ${min} characters` : ""

        if (typeof min !== "undefined") {
            super(defaultMessage + minLengthMessage)
        } else if (typeof max !== "undefined") {
            super(defaultMessage + maxLengthMessage)
        } else {
            super("")
        }

        this.name = "InvalidParamLength"
    }
}
