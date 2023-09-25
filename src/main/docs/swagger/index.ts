import { signupPaths } from "./paths/signup/index"
import { loginPaths } from "./paths/login"
import { surveyPaths } from "./paths/survey"
import { surveyResultPaths } from "./paths/surveyResult/index"
import { swaggerSchemas } from "./schemas"
import { swaggerResponses } from "./responses"

//Configuração do swagger
export const swaggerDoc = {
    openapi: "3.0.0",
    license: {
        name: "MIT License",
        url: "https://opensource.org/license/mit/"
    },
    info: {
        title: "Survey API",
        description: "A survey api for developers",
        version: "1.0.0"
    },
    servers: [
        {
            url: "/api",
            description: "Developer server"
        }
    ],
    tags: [
        {
            name: "account",
            description: "Signup and login operations"
        },
        {
            name: "survey",
            description: "Survey operations"
        }
    ],
    paths: {
        "/signup": signupPaths,
        "/login": loginPaths,
        "/surveys": surveyPaths,
        "/surveys/{id}/results": surveyResultPaths
    },
    components: {
        schemas: swaggerSchemas,
        responses: swaggerResponses,
        securitySchemes: {
            BearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                description: "Enter a valid JWT below."
            }
        }
    }
}
