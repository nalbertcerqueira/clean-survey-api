import { Role } from "@domain/entities/account"
import { TokenGeneratorService } from "@domain/services/token/tokenGeneratorService"
import { Payload, TokenValidatorService } from "@domain/services/token/tokenValidatorService"
import jwt from "jsonwebtoken"

export class JwtTokenService implements TokenGeneratorService, TokenValidatorService {
    constructor(private readonly secretKey: string) {}

    public async generate(id: string, role: Role): Promise<string> {
        const iat: number = Math.floor(Date.now() / 1000)
        const expiresIn: number = 86400

        const token = jwt.sign({ id, role, iat }, this.secretKey, {
            expiresIn,
            notBefore: 0,
            algorithm: "HS256"
        })
        return token
    }

    public async validate(token: string): Promise<Payload | null> {
        try {
            const payload = jwt.verify(token, this.secretKey, { algorithms: ["HS256"] }) as Payload
            return payload
        } catch {
            return null
        }
    }
}
