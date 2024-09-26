export const get = {
    tags: ["survey"],
    summary: "Get all surveys",
    description: "Allow an user with a **valid token** to fetch all surveys",
    operationId: "getAllSurveys",
    security: [{ BearerAuth: [] }],
    responses: {
        "200": {
            description: "Success",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        required: ["body"],
                        properties: {
                            body: {
                                $ref: "#/components/schemas/Surveys"
                            }
                        }
                    },
                    example: {
                        body: [
                            {
                                id: "37f2b3a0-69c4-4575-82aa-cfcfc296c27d",
                                question: "Survey question",
                                createdAt: "2024-09-26T23:07:50.371Z",
                                answers: [
                                    {
                                        id: "1",
                                        answer: "First answer",
                                        image: "https://image-url.com"
                                    },
                                    {
                                        id: "2",
                                        answer: "Second answer"
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        },
        "401": {
            $ref: "#/components/responses/UnauthorizedCredentials"
        },
        "500": {
            $ref: "#/components/responses/ServerError"
        }
    }
}
