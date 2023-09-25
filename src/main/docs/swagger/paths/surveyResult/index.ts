import { put } from "./put"
import { get } from "./get"
import { deletee } from "./delete"

export const surveyResultPaths = {
    get,
    put,
    delete: deletee
}
