import { Body, Controller, Param, Post, UseGuards, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/create-auth.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth, } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Auth')
@ApiBearerAuth('access-token')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiOperation({ summary: 'Login qilish' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Muvaffaqiyatli login',
    schema: {
      example: {
        accessToken: 'jwt.access.token',
        refreshToken: 'jwt.refresh.token',
        user: {
          id: 1,
          email: 'rahmatjon@gmail.com',
          role: 'user',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Email yoki parol noto‘g‘ri',
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Access tokenni yangilash' })
  @ApiBody({
    schema: {
      example: {
        refreshToken: 'jwt.refresh.token',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Yangi access token',
    schema: {
      example: {
        accessToken: 'new.jwt.access.token',
      },
    },
  })
  refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout/:userId')
  @ApiOperation({ summary: 'Logout qilish' })
  @ApiParam({
    name: 'userId',
    example: 1,
    description: 'Foydalanuvchi ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Muvaffaqiyatli logout',
    schema: {
      example: {
        message: 'User logged out successfully',
      },
    },
  })
  logout(@Param('userId') userId: number) {
    return this.authService.logout(userId);
  }
}
