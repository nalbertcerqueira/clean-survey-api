export const post = {
    tags: ["survey"],
    summary: "Create a survey",
    description:
        "Allow a user to create a survey if it has a **valid token**, and an **admin role**",
    operationId: "createSurvey",
    security: [{ BearerAuth: [] }],
    requestBody: {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/SurveyData"
                },
                example: {
                    question: "Survey question",
                    answers: [
                        { answer: "First answer", image: "http://image-url.com" },
                        { answer: "Second answer" }
                    ]
                }
            }
        }
    },
    responses: {
        "201": {
            description: "Created with success",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/ApiResponse"
                    },
                    example: {
                        body: null
                    }
                }
            }
        },
        "400": {
            $ref: "#/components/responses/BadRequest"
        },
        "401": {
            $ref: "#/components/responses/UnauthorizedCredentials"
        },
        "500": {
            $ref: "#/components/responses/ServerError"
        }
    }
}
