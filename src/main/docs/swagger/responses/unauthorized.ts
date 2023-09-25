export const unauthorizedLogin = {
    description: "Incorrect email or password",
    content: {
        "application/json": {
            schema: {
                $ref: "#/components/schemas/ErrorResponse"
            }
        }
    }
}

export const unauthorizedCredentials = {
    description: "Invalid credentials: **access token** or **role** is invalid",
    headers: {
        "WWW-Authenticate": {
            schema: {
                type: "string",
                example: 'Bearer realm="protected resources"'
            },
            description: "Defines the HTTP authentication strategy used"
        }
    },
    content: {
        "application/json": {
            schema: {
                $ref: "#/components/schemas/ErrorResponse"
            }
        }
    }
}
