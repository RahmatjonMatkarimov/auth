import { Column, DataType, Model, Table, HasOne } from "sequelize-typescript";
import { Auth } from "src/models/auth/entities/auth.entity";

@Table({ tableName: "users" })
export class User extends Model {
  @Column({ allowNull: false, type: DataType.STRING })
  name: string;

  @Column({ allowNull: false, type: DataType.STRING, unique: true })
  email: string;

  @HasOne(() => Auth)
  auth: Auth;
}
