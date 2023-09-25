export const put = {
    tags: ["survey"],
    summary: "Answer a survey",
    description:
        "Allows an user to answer a survey, or update it's answer, as long as it has a valid **access token**",
    operationId: "answerSurveyById",
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
    requestBody: {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/SurveyResultData"
                },
                example: {
                    answerId: "ba1db6c0-ad3e-4c36-a748-bdde49d4a910"
                }
            }
        }
    },
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
        "400": {
            $ref: "#/components/responses/BadRequest"
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
