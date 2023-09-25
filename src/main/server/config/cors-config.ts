import cors, { CorsOptions } from "cors"

export const corsOptions: CorsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
        "Accept",
        "X-Custom-Header",
        "Upgrade-Insecure-Requests",
        "Content-Type",
        "x-requested-with",
        "Accept-Version",
        "Content-Length",
        "Content-MD5",
        "Date",
        "Authorization"
    ]
}

export const corsMiddleware = () => cors(corsOptions)
