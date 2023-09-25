export const post = {
    tags: ["account"],
    summary: "Create an account for an user",
    description: "Create an account for an user",
    operationId: "signUp",
    requestBody: {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/Account"
                },
                examples: {
                    admin: {
                        value: {
                            name: "Admin name",
                            email: "admin@email.com",
                            password: "123456",
                            passwordConfirmation: "123456",
                            role: "admin"
                        }
                    },
                    user: {
                        value: {
                            name: "Common user name",
                            email: "user@email.com",
                            password: "123456",
                            passwordConfirmation: "123456"
                        }
                    }
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
                        required: ["body"],
                        properties: {
                            body: {
                                $ref: "#/components/schemas/CreatedAccount"
                            }
                        }
                    },
                    examples: {
                        admin: {
                            value: {
                                body: {
                                    id: "6504ec955b0993fdf002459c",
                                    name: "Admin name",
                                    email: "admin@email.com",
                                    role: "admin"
                                }
                            }
                        },
                        user: {
                            value: {
                                body: {
                                    id: "6505000b908db01526019320",
                                    name: "User name",
                                    email: "user@email.com"
                                }
                            }
                        }
                    }
                }
            }
        },
        "400": {
            $ref: "#/components/responses/BadRequest"
        },
        "409": {
            $ref: "#/components/responses/ConflictEmails"
        },
        "500": {
            $ref: "#/components/responses/ServerError"
        }
    }
}
