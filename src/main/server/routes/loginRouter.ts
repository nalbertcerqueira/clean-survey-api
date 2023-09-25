import { makeLoginController } from "@main/factories/controllers/login/loginControllerFactory"
import { expressControllerAdapter } from "@infra/adapters/expressControllerAdapter"
import express from "express"

//Router responsável pelas operações de login
const loginRouter = express.Router()

loginRouter.post("/login", expressControllerAdapter(makeLoginController()))

export default loginRouter
