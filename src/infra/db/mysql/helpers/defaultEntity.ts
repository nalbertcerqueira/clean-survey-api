import { CreateDateColumn, UpdateDateColumn } from "typeorm"

export abstract class DefaultORMEntity {
    @CreateDateColumn({ type: "timestamp", precision: 3, default: () => "CURRENT_TIMESTAMP(3)" })
    public createdAt!: Date

    @UpdateDateColumn({
        type: "timestamp",
        precision: 3,
        default: () => "CURRENT_TIMESTAMP(3)",
        onUpdate: "CURRENT_TIMESTAMP(3)"
    })
    public updatedAt!: Date
}
