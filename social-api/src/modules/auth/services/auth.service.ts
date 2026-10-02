import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../../user/services/user.service';
import { TokenService } from './token.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import {
  AuthResponseDto,
  TokenDto,
  UserProfileDto,
} from '../dto/auth-response.dto';
import {
  User,
  UserRole,
  UserStatus,
} from '../../../database/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponseDto> {
    const { emailExists, usernameExists } =
      await this.userService.checkExisting(dto.email, dto.username);

    if (emailExists) {
      throw new ConflictException('Email đã được sử dụng');
    }
    if (usernameExists) {
      throw new ConflictException('Username đã được sử dụng');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = await this.userService.create({
      email: dto.email.toLowerCase(),
      username: dto.username.toLowerCase(),
      password: hashedPassword,
      fullName: dto.fullName,
      role: UserRole.USER,
      status: UserStatus.ACTIVE,
    });

    const tokens = await this.tokenService.generateTokens(newUser);

    return {
      user: this.mapToUserProfile(newUser),
      tokens,
    };
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userService.findByIdentifierWithPassword(
      dto.identifier.toLowerCase(),
    );

    if (!user) {
      throw new UnauthorizedException('Thông tin đăng nhập không chính xác');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Thông tin đăng nhập không chính xác');
    }

    if (user.status === UserStatus.BANNED) {
      throw new ForbiddenException('Tài khoản của bạn đã bị khóa');
    }
    if (user.status === UserStatus.INACTIVE) {
      throw new ForbiddenException('Tài khoản chưa được kích hoạt');
    }

    await this.userService.updateLastLogin(user.id);
    const tokens = await this.tokenService.generateTokens(user);

    return {
      user: this.mapToUserProfile(user),
      tokens,
    };
  }

  async refreshToken(dto: RefreshTokenDto): Promise<TokenDto> {
    const payload = await this.tokenService.verifyRefreshToken(
      dto.refreshToken,
    );

    const user = await this.userService.findById(payload.sub);
    if (!user || user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException(
        'User does not exist or is no longer active',
      );
    }

    return this.tokenService.generateTokens(user);
  }

  async logout(userId: string): Promise<{ message: string }> {
    await this.tokenService.revokeRefreshToken(userId);
    return { message: 'Đăng xuất thành công' };
  }

  async getMe(userId: string): Promise<UserProfileDto> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('Không tìm thấy thông tin người dùng');
    }

    return this.mapToUserProfile(user);
  }

  private mapToUserProfile(user: User): UserProfileDto {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      avatarUrl: user.avatarUrl ?? null,
      bio: user.bio ?? null,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
    };
  }
}
