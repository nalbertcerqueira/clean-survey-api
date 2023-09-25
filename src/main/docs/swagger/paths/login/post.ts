export const post = {
    tags: ["account"],
    summary: "Authenticate an user",
    description: "Authenticate an user, by providing it's **email** and **password**",
    operationId: "login",
    requestBody: {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/LoginData"
                },
                example: {
                    email: "someemail@email.com",
                    password: "123456"
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
                                $ref: "#/components/schemas/AccessToken"
                            }
                        },
                        example: {
                            body: {
                                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
                            }
                        }
                    }
                }
            }
        },
        "400": {
            $ref: "#/components/responses/BadRequest"
        },
        "401": {
            $ref: "#/components/responses/UnauthorizedLogin"
        },
        "500": {
            $ref: "#/components/responses/ServerError"
        }
    }
}
