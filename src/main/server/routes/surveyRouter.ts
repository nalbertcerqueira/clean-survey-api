import { makeCreateSurveyController } from "@main/factories/controllers/survey/createSurveyFactory"
import { makeGetAllSurveysController } from "@main/factories/controllers/survey/getAllSurveysFactory"
import { makeAuthMiddleware } from "@main/factories/middlewares/authMiddlewareFactory"
import { expressControllerAdapter } from "@infra/adapters/expressControllerAdapter"
import { expressMiddlewareAdapter } from "@infra/adapters/expressMiddlewareAdapter"
import express from "express"

//Router responsável pelas operações que envolvem criação e visualização de enquetes
const surveyRouter = express.Router()
const adminAuth = expressMiddlewareAdapter(makeAuthMiddleware("admin"))
const userAuth = expressMiddlewareAdapter(makeAuthMiddleware())

surveyRouter.post("/surveys", adminAuth, expressControllerAdapter(makeCreateSurveyController()))
surveyRouter.get("/surveys", userAuth, expressControllerAdapter(makeGetAllSurveysController()))

export default surveyRouter
