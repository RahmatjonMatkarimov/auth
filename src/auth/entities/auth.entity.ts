import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "auth", timestamps: true })
export class Auth extends Model {
    @Column({
        allowNull: false,
        type: DataType.STRING,
        unique: true
    })
    email: String

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    password: String

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    role: String

    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    user_id: Number
}
