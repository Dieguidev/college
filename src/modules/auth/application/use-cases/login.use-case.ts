import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../dto';
import { AuthRepository } from '../../infrastructure/repositories/auth.repository';
import { JwtPayload } from '../../interfaces/controllers/interfaces/jwt-payload.interface';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(loginUserDto: LoginUserDto, institucionId: number) {
    const { username, password } = loginUserDto;

    const user = await this.authRepository.validateUser(
      username,
      password,
      institucionId,
    );

    if (!user) {
      throw new UnauthorizedException('Credenciales no válidas');
    }

    // Preparar el payload para el JWT
    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
      rol: user.rol,
      institucionId: user.institucionId,
    };

    return {
      user: {
        id: user.id,
        username: user.username,
        rol: user.rol,
        institucionId: user.institucionId,
      },
      token: this.jwtService.sign(payload),
    };
  }
}
