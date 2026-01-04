import { Column, DataType, Model, Table, ForeignKey } from "sequelize-typescript"
import { Role } from "src/common/enums/roles.enum"
import { User } from "src/models/user/entities/user.entity"

@Table({ tableName: "auth" })
export class Auth extends Model {
  @Column({ allowNull: false, type: DataType.STRING, unique: true })
  email: string

  @Column({ allowNull: false, type: DataType.STRING })
  password: string

  @Column({ allowNull: false, type: DataType.ENUM(...Object.values(Role)), defaultValue: Role.USER })
  role: Role

  @Column({ type: DataType.STRING, allowNull: true })
  refreshToken: string 

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number
}
