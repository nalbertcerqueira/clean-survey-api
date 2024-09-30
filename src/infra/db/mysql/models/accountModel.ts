import { IAccount, IRole } from "@domain/entities/account"
import { Entity, Column, PrimaryColumn } from "typeorm"
import { DefaultORMEntity } from "../helpers/defaultEntity"
import { uuidTransformer } from "../helpers"

interface AccountORMProps extends IAccount {
    createdAt: Date
    updatedAt: Date
}

@Entity({ name: "account" })
export class AccountORMEntity extends DefaultORMEntity implements AccountORMProps {
    @PrimaryColumn({ type: "binary", length: 16, transformer: uuidTransformer })
    public id!: string

    @Column({ type: "varchar", length: 100 })
    public name!: string

    @Column({ type: "varchar", length: 100, unique: true })
    public email!: string

    @Column({ type: "varchar", length: 100 })
    public password!: string

    @Column({ type: "enum", enum: ["user", "admin"], default: "user" })
    public role!: IRole
}
