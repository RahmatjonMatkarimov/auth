import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/enums/roles.enum';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiOperation({ summary: 'Yangi foydalanuvchi yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Foydalanuvchi yaratildi',
    schema: {
      example: {
        id: 1,
        name: 'Rahmatjon',
        email: 'rahmatjon@gmail.com',
        createdAt: '2026-01-04T10:00:00.000Z',
      },
    },
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha foydalanuvchini olish' })
  @ApiParam({
    name: 'id',
    example: 1,
    description: 'Foydalanuvchi ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Foydalanuvchi topildi',
    schema: {
      example: {
        id: 1,
        name: 'Rahmatjon',
        email: 'rahmatjon@gmail.com',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Foydalanuvchi topilmadi',
  })
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }


  @Patch(':id')
  @ApiOperation({ summary: 'Foydalanuvchini yangilash' })
  @ApiParam({
    name: 'id',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Foydalanuvchi yangilandi',
    schema: {
      example: {
        id: 1,
        name: 'Rahmatjon Updated',
        email: 'rahmatjon@gmail.com',
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Foydalanuvchini o‘chirish' })
  @ApiParam({
    name: 'id',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Foydalanuvchi o‘chirildi',
    schema: {
      example: {
        message: 'User deleted successfully',
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
