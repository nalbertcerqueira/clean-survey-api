export const notFound = {
    description: "Item not found",
    content: {
        "application/json": {
            schema: {
                $ref: "#/components/schemas/ErrorResponse"
            }
        }
    }
}
