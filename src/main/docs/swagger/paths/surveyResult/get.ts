export const get = {
    tags: ["survey"],
    summary: "Get the result of a survey",
    description: "Returns the result of a survey, as long as the user has a valid **access token**",
    operationId: "getSurveyResultById",
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
                                $ref: "#/components/schemas/SurveyResult"
                            }
                        }
                    },
                    example: {
                        body: {
                            id: "37f2b3a0-69c4-4575-82aa-cfcfc296c27d",
                            question: "Survey question",
                            createdAt: "2024-09-26T23:07:50.371Z",
                            totalCount: 5,
                            answers: [
                                {
                                    id: "1",
                                    answer: "First answer",
                                    count: 3,
                                    percent: 60
                                },
                                {
                                    id: "2",
                                    answer: "Second answer",
                                    count: 2,
                                    percent: 40
                                }
                            ]
                        }
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
