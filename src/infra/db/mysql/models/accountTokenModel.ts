import { IAccountToken } from "@domain/entities/accountToken"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { uuidTransformer } from "../helpers"
import { AccountORMEntity } from "./accountModel"

@Entity({ name: "accountToken" })
export class AccountTokenORMEntity implements IAccountToken {
    @PrimaryColumn({ type: "binary", length: 16, transformer: uuidTransformer })
    public accountId!: string

    @PrimaryColumn({ type: "enum", enum: ["accessToken"] })
    public name!: IAccountToken["name"]

    @Column({ type: "text" })
    public value!: string

    @ManyToOne(() => AccountORMEntity, { onDelete: "CASCADE" })
    @JoinColumn({ name: "accountId", referencedColumnName: "id" })
    public account!: AccountORMEntity
}
