export const uuidTransformer = {
    to: UUIDtoBinary,
    from: binaryToUUID
}

export const intTransformer = {
    to: (value: string): number => Math.abs(Math.trunc(parseInt(value))),
    from: (value: number): string => `${value}`
}

//O undefined é usado pois o typeorm utiliza left-joins para criar relações ao
//usar {relation: {...}}. Por isso é necessário considerar casos nos quais não existem registros
export function UUIDtoBinary(uuid?: string): Buffer | undefined {
    return uuid ? Buffer.from(uuid.replace(/-/g, ""), "hex") : undefined
}

//O undefined é usado pois o typeorm utiliza left-joins para criar relações ao
//usar {relation: {...}}. Por isso é necessário considerar casos nos quais não existem registros
export function binaryToUUID(bin?: Buffer): string | undefined {
    if (!bin) {
        return undefined
    }
    return `${bin.toString("hex", 0, 4)}-${bin.toString("hex", 4, 6)}-${bin.toString(
        "hex",
        6,
        8
    )}-${bin.toString("hex", 8, 10)}-${bin.toString("hex", 10, 16)}`
}
