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
                            id: "6507b3d1f5546c66bd006ed5",
                            question: "Survey question",
                            createdAt: 1695003701964,
                            totalCount: 5,
                            answers: [
                                {
                                    id: "5a20dac7-add4-4cd8-a300-03fac0904ace",
                                    answer: "First answer",
                                    count: 3,
                                    percent: 60
                                },
                                {
                                    id: "10786a70-a0e1-4b65-a190-362cfd0a899b",
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
