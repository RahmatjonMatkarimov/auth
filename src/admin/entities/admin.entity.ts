import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'admin', timestamps: true })
export class Admin extends Model {
    @Column({ allowNull: false, type: DataType.STRING })
    username: string

    @Column({ allowNull: false, type: DataType.STRING })
    password: string

    @Column({ allowNull: false, type: DataType.STRING })
    role: string
}
