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
                                id: "65073839f5546c66bd006ed0",
                                question: "Survey question",
                                createdAt: 1694971999332,
                                answers: [
                                    {
                                        id: "bc4534eb-dee3-4026-8bd9-d278ef8371ab",
                                        answer: "First answer",
                                        image: "https://image-url.com"
                                    },
                                    {
                                        id: "e9efd724-e779-4fc7-97dd-9448f2ac5cf3",
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
