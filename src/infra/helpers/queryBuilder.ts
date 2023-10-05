interface LookupInput {
    from: string
    localField: string
    foreignField: string
    as: string
}

interface MapResult {
    $map: { input: string; as: string; in: Record<string, any> }
}

interface FilterResult {
    $filter: { input: string; as: string; cond: Record<string, any> }
}

interface RoundResult {
    $round: [Record<string, any> | string, number]
}

//Classe para auxiliar na criação do pipeline de agregação utilizado no mongodb
export class QueryBuilder {
    private readonly pipelineQuery: Record<string, any>[] = []

    public match(query: Record<string, any>): QueryBuilder {
        this.pipelineQuery.push({ $match: query })
        return this
    }

    public addFields(query: Record<string, any>): QueryBuilder {
        this.pipelineQuery.push({ $addFields: query })
        return this
    }

    public lookUp(input: LookupInput): QueryBuilder {
        this.pipelineQuery.push({ $lookup: { ...input } })
        return this
    }

    public project(query: Record<string, any>): QueryBuilder {
        this.pipelineQuery.push({ $project: query })
        return this
    }

    public set(fieldName: string, value: any): QueryBuilder {
        this.pipelineQuery.push({ $set: { [`${fieldName}`]: value } })
        return this
    }

    public map(input: string, as: string, convertIn: Record<string, any>): MapResult {
        return { $map: { input, as, in: convertIn } }
    }

    public filter(input: string, as: string, cond: Record<string, any>): FilterResult {
        return { $filter: { input, as, cond } }
    }

    public percentage(targetField: string, totalField: string): Record<string, any> {
        return {
            $multiply: [{ $divide: [targetField, totalField] }, 100]
        }
    }

    public round(target: string | Record<string, any>, decimalDigits: number = 0): RoundResult {
        return {
            $round: [target, decimalDigits]
        }
    }

    public build(): Record<string, any>[] {
        return this.pipelineQuery
    }
}
