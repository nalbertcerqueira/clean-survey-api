import { ISurvey } from "@domain/entities/survey"
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { SurveyAnswerORMEntity } from "./surveyAnswerModel"
import { DefaultORMEntity } from "../helpers/defaultEntity"
import { uuidTransformer } from "../helpers"

interface SurveyORMProps extends Omit<ISurvey, "answers"> {
    updatedAt: Date
}

@Entity("survey")
export class SurveyORMEntity extends DefaultORMEntity implements SurveyORMProps {
    @PrimaryColumn({ type: "binary", length: 16, transformer: uuidTransformer })
    public id!: string

    @Column({ type: "text" })
    public question!: string

    @OneToMany(() => SurveyAnswerORMEntity, (answer) => answer.survey, { cascade: ["insert"] })
    public answers!: SurveyAnswerORMEntity[]
}
