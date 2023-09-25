export const deletee = {
    tags: ["survey"],
    summary: "Delete a registry of an user answer",
    description:
        "Allows an user to cancel it's participation in a survey, by deleting it's answer. Its required a valid **access token**",
    operationId: "deleteSurveyResultById",
    security: [{ BearerAuth: [] }],
    parameters: [
        {
            in: "path",
            name: "id",
            required: true,
            description: "The survey id",
            schema: { type: "string" }
        }
    ],
    responses: {
        "200": {
            description: "Success",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        require: ["body"],
                        properties: {
                            body: {
                                type: "object",
                                nullable: true
                            }
                        }
                    },
                    example: {
                        body: null
                    }
                }
            }
        },
        "404": {
            $ref: "#/components/responses/NotFound"
        },
        "401": {
            $ref: "#/components/responses/UnauthorizedCredentials"
        },
        "500": {
            $ref: "#/components/responses/ServerError"
        }
    }
}
