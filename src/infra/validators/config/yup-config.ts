import {
    InvalidLengthError,
    InvalidParamError,
    InvalidTypeError,
    MissingParamError,
    UnknownParamError
} from "@presentation/errors/index"
import * as yup from "yup"

//Modificando o padrão de respostas do yup para erros de validação
const defaultErrorMessages: yup.LocaleObject = {
    mixed: {
        notNull: new MissingParamError("${path}").message,
        defined: new MissingParamError("${path}").message,
        required: new MissingParamError("${path}").message,
        notType: new InvalidTypeError("${path}", "${type}").message
    },
    string: {
        email: new InvalidParamError("${path}", "email").message,
        min: new InvalidLengthError("${path}", { min: "${min}" }).message,
        max: new InvalidLengthError("${path}", { max: "${max}" }).message
    },
    object: {
        noUnknown: new UnknownParamError("${unknown}").message
    }
}

yup.setLocale(defaultErrorMessages)

export = yup
