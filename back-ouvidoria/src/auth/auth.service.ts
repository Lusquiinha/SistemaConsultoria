import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from '../users/dto/user.response.dto';
import { Result, ok, err } from 'neverthrow';
import { UserRole } from '../users/user.entity';
import { UUID } from 'node:crypto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto): Promise<Result<{ accessToken: string; refreshToken: string }, Error>> {
        const userResult = await this.userService.findByEmailAuth(loginDto.email);
        if (userResult.isErr()) {
            return err(new Error('Invalid credentials'));
        }

        const user = userResult.value;
        const passwordMatch = await bcrypt.compare(loginDto.password, user.password);
        if (!passwordMatch) {
            return err(new Error('Invalid credentials'));
        }

        const payload = { email: user.email, sub: user.id, role: user.role };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = await this.generateRefreshToken(user.id);
        return ok({ accessToken, refreshToken });
    }

    async register(registerDto: RegisterDto): Promise<Result<UserResponseDto, Error>> {
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const userResult = await this.userService.createUser({ ...registerDto, password: hashedPassword, role: UserRole.CLIENT });
        if (userResult.isErr()) {
            return err(userResult.error);
        }

        return ok(userResult.value);
    }

    async generateRefreshToken(userId: string): Promise<string> {
        const refreshToken = this.jwtService.sign({ sub: userId }, { expiresIn: '7d' });
        await this.userService.updateUser(userId as UUID, { refreshToken });
        return refreshToken;
    }

    async refreshToken(refreshToken: string): Promise<Result<{ accessToken: string }, Error>> {
        const userResult = await this.userService.findByRefreshToken(refreshToken);
        if (userResult.isErr()) {
            return err(new Error('Invalid refresh token'));
        }

        const user = userResult.value;
        const payload = { email: user.email, sub: user.id, role: user.role };
        const accessToken = this.jwtService.sign(payload);
        return ok({ accessToken });
    }
}
