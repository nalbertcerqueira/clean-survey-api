import { HashCompareService } from "@domain/services/encryption/hashCompareService"
import { HashService } from "@domain/services/encryption/hashService"
import bcrypt from "bcrypt"

export class BcryptEncrypterService implements HashService, HashCompareService {
    constructor(private readonly salt: number) {}

    public async hash(input: string): Promise<string> {
        return await bcrypt.hash(input, this.salt)
    }

    public async compare(input: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(input, hash)
    }
}
