import { makeSignUpController } from "@main/factories/controllers/signup/signupControllerFactory"
import { expressControllerAdapter } from "@infra/adapters/expressControllerAdapter"
import express from "express"

//Router responsável pelas operações de cadastro de um usuário
const signupRouter = express.Router()

signupRouter.post("/signup", expressControllerAdapter(makeSignUpController()))

export default signupRouter
