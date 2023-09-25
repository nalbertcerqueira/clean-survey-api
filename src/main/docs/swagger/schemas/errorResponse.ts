export const errorResponseSchema = {
    type: "object",
    required: ["errors"],
    properties: {
        errors: {
            type: "array",
            minItems: 1,
            items: {
                type: "string"
            }
        }
    }
}
