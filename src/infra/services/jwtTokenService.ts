import { TokenGeneratorService } from "@domain/services/token/tokenGeneratorService"
import { Payload, TokenValidatorService } from "@domain/services/token/tokenValidatorService"
import jwt from "jsonwebtoken"

export class JwtTokenService implements TokenGeneratorService, TokenValidatorService {
    constructor(private readonly secretKey: string) {}

    public async generate(id: string): Promise<string> {
        const iat: number = Math.floor(Date.now() / 1000)
        const expiresIn: number = 86400

        const token = jwt.sign({ id, iat }, this.secretKey, {
            expiresIn,
            notBefore: 0
        })
        return token
    }

    public async validate(token: string): Promise<Payload | null> {
        try {
            const payload = jwt.verify(token, this.secretKey) as Payload
            return payload
        } catch {
            return null
        }
    }
}
