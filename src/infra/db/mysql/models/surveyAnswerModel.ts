import { ISurveyAnswer } from "@domain/entities/survey"
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm"
import { intTransformer, uuidTransformer } from "../helpers"
import { SurveyORMEntity } from "./surveyModel"
import { SurveyResponseORMEntity } from "./surveyResponseModel"

interface SurveyAnswerORMProps extends ISurveyAnswer {
    surveyId: string
}

@Entity("surveyAnswer")
export class SurveyAnswerORMEntity implements SurveyAnswerORMProps {
    @PrimaryColumn({ type: "binary", length: 16, transformer: uuidTransformer })
    public surveyId!: string

    @PrimaryColumn({ type: "smallint", unsigned: true, transformer: intTransformer })
    public id!: string

    @Column({ type: "varchar", length: 100 })
    public answer!: string

    @Column({ type: "varchar", length: 512, nullable: true })
    public image!: string | null

    @ManyToOne(() => SurveyORMEntity, { onDelete: "CASCADE" })
    @JoinColumn({ name: "surveyId", referencedColumnName: "id" })
    public survey!: SurveyORMEntity

    @OneToMany(() => SurveyResponseORMEntity, (child) => child.answer)
    public responses!: SurveyResponseORMEntity[]
}
