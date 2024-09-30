import { ISurveyResultRegistry } from "@domain/entities/surveyResult"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { intTransformer, uuidTransformer } from "../helpers"
import { SurveyAnswerORMEntity } from "./surveyAnswerModel"
import { AccountORMEntity } from "./accountModel"
import { DefaultORMEntity } from "../helpers/defaultEntity"

interface SurveyResponseORMProps extends ISurveyResultRegistry {
    updatedAt: Date
}

@Entity("surveyResponse")
export class SurveyResponseORMEntity extends DefaultORMEntity implements SurveyResponseORMProps {
    @PrimaryColumn({ type: "binary", length: 16, transformer: uuidTransformer })
    public accountId!: string

    @PrimaryColumn({ type: "binary", length: 16, transformer: uuidTransformer })
    public surveyId!: string

    @Column({ type: "smallint", unsigned: true, transformer: intTransformer })
    public answerId!: string

    @ManyToOne(() => AccountORMEntity)
    @JoinColumn({ name: "accountId", referencedColumnName: "id" })
    public account!: AccountORMEntity

    @ManyToOne(() => SurveyAnswerORMEntity, (parent) => parent.responses)
    @JoinColumn([
        { name: "surveyId", referencedColumnName: "surveyId" },
        { name: "answerId", referencedColumnName: "id" }
    ])
    public answer!: SurveyAnswerORMEntity
}
