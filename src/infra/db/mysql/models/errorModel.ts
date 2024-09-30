import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("errorLog")
export class ErrorORMEntity {
    @PrimaryGeneratedColumn("increment", { unsigned: true })
    public id!: number

    @Column({ type: "text" })
    public stack!: string

    @CreateDateColumn({ type: "timestamp", precision: 3, default: () => "CURRENT_TIMESTAMP(3)" })
    public createdAt!: Date
}
