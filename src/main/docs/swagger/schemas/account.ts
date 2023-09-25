export const accountSchema = {
    type: "object",
    required: ["name", "email", "password", "passwordConfirmation"],
    properties: {
        name: { type: "string" },
        email: { type: "string", format: "email" },
        password: { type: "string", format: "password" },
        passwordConfirmation: { type: "string", format: "password" },
        role: { type: "string", enum: ["admin"] }
    }
}

export const createdAccountSchema = {
    type: "object",
    required: ["id", "name", "email"],
    properties: {
        id: { type: "string" },
        name: { type: "string" },
        email: { type: "string", format: "email" },
        role: { type: "string", enum: ["admin"] }
    }
}
