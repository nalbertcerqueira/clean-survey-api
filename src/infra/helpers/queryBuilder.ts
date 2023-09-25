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

    match(query: Record<string, any>): QueryBuilder {
        this.pipelineQuery.push({ $match: query })
        return this
    }

    addFields(query: Record<string, any>): QueryBuilder {
        this.pipelineQuery.push({ $addFields: query })
        return this
    }

    lookUp(input: LookupInput): QueryBuilder {
        this.pipelineQuery.push({ $lookup: { ...input } })
        return this
    }

    project(query: Record<string, any>): QueryBuilder {
        this.pipelineQuery.push({ $project: query })
        return this
    }

    set(fieldName: string, value: any): QueryBuilder {
        this.pipelineQuery.push({ $set: { [`${fieldName}`]: value } })
        return this
    }

    map(input: string, as: string, convertIn: Record<string, any>): MapResult {
        return { $map: { input, as, in: convertIn } }
    }

    filter(input: string, as: string, cond: Record<string, any>): FilterResult {
        return { $filter: { input, as, cond } }
    }

    percentage(targetField: string, totalField: string): Record<string, any> {
        return {
            $multiply: [{ $divide: [targetField, totalField] }, 100]
        }
    }

    round(target: string | Record<string, any>, decimalDigits: number = 0): RoundResult {
        return {
            $round: [target, decimalDigits]
        }
    }

    build(): Record<string, any>[] {
        return this.pipelineQuery
    }
}
