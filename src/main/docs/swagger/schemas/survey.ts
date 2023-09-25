export const addSurveySchema = {
    type: "object",
    required: ["question", "answers"],
    properties: {
        question: {
            type: "string"
        },
        answers: {
            type: "array",
            minItems: 1,
            items: {
                type: "object",
                required: ["answer"],
                properties: {
                    answer: { type: "string" },
                    image: { type: "string", format: "uri" }
                }
            }
        }
    }
}

export const arrayOfSurveys = {
    type: "array",
    items: {
        type: "object",
        required: ["id", "question", "answers", "createdAt"],
        properties: {
            id: { type: "string" },
            question: { type: "string" },
            createdAt: { type: "number" },
            answers: {
                type: "array",
                minItems: 1,
                items: {
                    type: "object",
                    required: ["id", "answer"],
                    properties: {
                        id: { type: "string", format: "uuid" },
                        answer: { type: "string" },
                        image: { type: "string", format: "uri" }
                    }
                }
            }
        }
    }
}
