export const conflictingEmails = {
    description: "Email already exists",
    content: {
        "application/json": {
            schema: {
                $ref: "#/components/schemas/ErrorResponse"
            }
        }
    }
}
