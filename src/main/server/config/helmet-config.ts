import helmet, { HelmetOptions } from "helmet"

const options: HelmetOptions = {
    contentSecurityPolicy: false,
    dnsPrefetchControl: false,
    xDownloadOptions: false,
    referrerPolicy: false
}

export const helmetMiddleware = () => helmet(options)
