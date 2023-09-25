import {
    accessTokenSchema,
    accountSchema,
    addSurveySchema,
    apiResponseSchema,
    arrayOfSurveys,
    createdAccountSchema,
    errorResponseSchema,
    loginDataSchema,
    surveyResultSchema,
    updateSurveyResultSchema
} from "./schemas/index"

export const swaggerSchemas = {
    Account: accountSchema,
    CreatedAccount: createdAccountSchema,
    LoginData: loginDataSchema,
    AccessToken: accessTokenSchema,
    SurveyData: addSurveySchema,
    Surveys: arrayOfSurveys,
    SurveyResultData: updateSurveyResultSchema,
    SurveyResult: surveyResultSchema,
    ApiResponse: apiResponseSchema,
    ErrorResponse: errorResponseSchema
}
