export const serverError = {
    description: "Server internal error",
    content: {
        "application/json": {
            schema: {
                $ref: "#/components/schemas/ErrorResponse"
            }
        }
    }
}
