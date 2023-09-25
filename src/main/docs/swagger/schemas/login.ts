export const loginDataSchema = {
    type: "object",
    require: ["email", "password"],
    properties: {
        email: { type: "string", format: "email" },
        password: { type: "string", format: "password" }
    }
}
