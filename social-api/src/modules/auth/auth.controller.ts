import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './services/auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import {
  AuthResponseDto,
  TokenDto,
  UserProfileDto,
} from './dto/auth-response.dto';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Đăng ký tài khoản người dùng mới' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Đăng ký thành công',
    type: AuthResponseDto,
  })
  async register(@Body() dto: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Đăng nhập tài khoản' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Đăng nhập thành công',
    type: AuthResponseDto,
  })
  async login(@Body() dto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(dto);
  }

  @Public()
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Làm mới Access Token bằng Refresh Token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Cấp token mới thành công',
    type: TokenDto,
  })
  async refreshToken(@Body() dto: RefreshTokenDto): Promise<TokenDto> {
    return this.authService.refreshToken(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Đăng xuất khỏi hệ thống' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Đăng xuất thành công',
  })
  async logout(
    @CurrentUser('sub') userId: string,
  ): Promise<{ message: string }> {
    return this.authService.logout(userId);
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy thông tin tài khoản đang đăng nhập' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lấy thông tin thành công',
    type: UserProfileDto,
  })
  async getMe(@CurrentUser('sub') userId: string): Promise<UserProfileDto> {
    return this.authService.getMe(userId);
  }
}
