export const apiResponseSchema = {
    type: "object",
    required: ["body"],
    properties: {
        body: {
            type: "object",
            nullable: true
        }
    }
}
