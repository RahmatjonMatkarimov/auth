import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './entities/user.entity'
import { Auth } from 'src/models/auth/entities/auth.entity'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Auth) private authModel: typeof Auth,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto
    const existingAuth = await this.authModel.findOne({ where: { email } })
    if (existingAuth) throw new BadRequestException('Email already used')

    const user = await this.userModel.create({ name, email })
    const hashedPassword = await bcrypt.hash(password, 10)

    await this.authModel.create({
      email,
      password: hashedPassword,
      role: 'user',
      userId: user.id,
    })

    return user
  }

  async findOne(id: number) {
    const user = await this.userModel.findByPk(id, {
      include: [{ model: Auth, attributes: ['email', 'role'] }],
    })

    if (!user) throw new NotFoundException('User not found')
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { name, email, password } = updateUserDto

    const user = await this.userModel.findByPk(id)
    if (!user) throw new NotFoundException('User not found')

    await user.update({ name })

    const auth = await this.authModel.findOne({ where: { userId: id } })
    if (!auth) throw new NotFoundException('Auth data not found')

    if (email) {
      const emailExists = await this.authModel.findOne({ where: { email } })
      if (emailExists && emailExists.userId !== id) throw new BadRequestException('Email already used')
      auth.email = email
    }

    if (password) auth.password = await bcrypt.hash(password, 10)

    await auth.save()
    return user
  }

  async remove(id: number) {
    const user = await this.userModel.findByPk(id)
    if (!user) throw new NotFoundException('User not found')

    await this.authModel.destroy({ where: { userId: id } })
    await user.destroy()

    return { message: 'User deleted successfully' }
  }
}
