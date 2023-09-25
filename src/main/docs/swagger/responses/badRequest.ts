export const badRequest = {
    description: "Invalid params in request body",
    content: {
        "application/json": {
            schema: {
                $ref: "#/components/schemas/ErrorResponse"
            }
        }
    }
}
