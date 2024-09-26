export const updateSurveyResultSchema = {
    type: "object",
    required: ["answerId"],
    properties: {
        answerId: {
            type: "string",
            format: "uuid"
        }
    }
}

export const surveyResultSchema = {
    type: "object",
    required: ["id", "question", "createdAt", "totalCount", "answers"],
    properties: {
        id: { type: "string" },
        question: { type: "string" },
        createdAt: { type: "string", format: "date-time" },
        totalCount: { type: "integer", format: "int" },
        answers: {
            type: "array",
            items: {
                type: "object",
                required: ["id", "answer", "count", "percent"],
                properties: {
                    id: { type: "string", format: "uuid" },
                    answer: { type: "string" },
                    image: { type: "string", format: "uri" },
                    count: { type: "integer", format: "int" },
                    percent: { type: "number", format: "float" }
                }
            }
        }
    }
}
