export const accessTokenSchema = {
    type: "object",
    required: ["token"],
    properties: {
        token: { type: "string" }
    }
}
