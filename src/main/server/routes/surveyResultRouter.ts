import { makeAuthMiddleware } from "@main/factories/middlewares/authMiddlewareFactory"
import { makeGetSurveyResultController } from "@main/factories/controllers/surveyResult/getSurveyResultFactory"
import { makeUpdateSurveyResultController } from "@main/factories/controllers/surveyResult/updateSurveyResultFactory"
import { makeDeleteSurveyResultController } from "@main/factories/controllers/surveyResult/deleteSurveyResultFactory"
import { expressControllerAdapter } from "@infra/adapters/expressControllerAdapter"
import { expressMiddlewareAdapter } from "@infra/adapters/expressMiddlewareAdapter"
import express from "express"

//Router responsável pelas operações que envolvem resultados de enquetes
const surveyResultRouter = express.Router()
const userAuth = expressMiddlewareAdapter(makeAuthMiddleware())

surveyResultRouter.get(
    "/surveys/:id/results",
    userAuth,
    expressControllerAdapter(makeGetSurveyResultController())
)
surveyResultRouter.put(
    "/surveys/:id/results",
    userAuth,
    expressControllerAdapter(makeUpdateSurveyResultController())
)
surveyResultRouter.delete(
    "/surveys/:id/results",
    userAuth,
    expressControllerAdapter(makeDeleteSurveyResultController())
)

export default surveyResultRouter
