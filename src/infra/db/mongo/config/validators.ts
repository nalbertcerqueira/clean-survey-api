import { Document } from "mongodb"

//Esquemas de validação de dados para cada coleção do mongodb

export const accountMongoSchema: Document = {
    $jsonSchema: {
        bsonType: "object",
        additionalProperties: false,
        required: ["name", "email", "password"],
        properties: {
            _id: {},
            name: {
                bsonType: "string",
                minLength: 4
            },
            email: {
                bsonType: "string",
                minLength: 8,
                pattern: "^[a-zA-Z0-9._%+-]{4,}@[a-zA-Z0-9.-]{2,}\\.[a-zA-Z0-9]{2,}$"
            },
            password: {
                bsonType: "string",
                minLength: 6
            },
            role: {
                bsonType: "string",
                enum: ["admin", "user"]
            },
            createdAt: {
                bsonType: "double"
            },
            updatedAt: {
                bsonType: "double"
            }
        }
    }
}

export const tokenMongoSchema: Document = {
    $jsonSchema: {
        bsonType: "object",
        additionalProperties: false,
        required: ["accountId", "tokenName", "tokenValue"],
        properties: {
            _id: {},
            accountId: {
                bsonType: "string",
                minLength: 24
            },
            tokenName: {
                bsonType: "string",
                enum: ["accessToken"]
            },
            tokenValue: {
                bsonType: "string"
            }
        }
    }
}

export const surveyMongoSchema: Document = {
    $jsonSchema: {
        bsonType: "object",
        additionalProperties: false,
        required: ["question", "answers", "createdAt", "updatedAt"],
        properties: {
            _id: {},
            question: {
                bsonType: "string",
                minLength: 8
            },
            createdAt: {
                bsonType: "double"
            },
            updatedAt: {
                bsonType: "double"
            },
            answers: {
                bsonType: "array",
                minItems: 1,
                items: {
                    bsonType: "object",
                    required: ["id", "answer"],
                    additionalProperties: false,
                    properties: {
                        id: {
                            bsonType: "string"
                        },
                        answer: {
                            bsonType: "string",
                            minLength: 6
                        },
                        image: {
                            bsonType: "string"
                        }
                    }
                }
            }
        }
    }
}

export const resultMongoSchema: Document = {
    $jsonSchema: {
        bsonType: "object",
        required: ["accountId", "surveyId", "answerId", "createdAt", "updatedAt"],
        additionalProperties: false,
        properties: {
            _id: {},
            accountId: {
                bsonType: "string",
                minLength: 24
            },
            surveyId: {
                bsonType: "string",
                minLength: 24
            },
            answerId: {
                bsonType: "string"
            },
            createdAt: {
                bsonType: "double"
            },
            updatedAt: {
                bsonType: "double"
            }
        }
    }
}

export const errorLogMongoSchema: Document = {
    $jsonSchema: {
        bsonType: "object",
        additionalProperties: false,
        required: ["stack", "createdAt"],
        properties: {
            _id: {},
            stack: {
                bsonType: "string"
            },
            createdAt: {
                bsonType: "double"
            }
        }
    }
}
