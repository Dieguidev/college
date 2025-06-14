import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../controllers/interfaces/jwt-payload.interface';
import { envs } from '../../../../config/envs';
import { ConfigService } from '@nestjs/config';
import { IAuthRepository } from '../../domain/repositories/auth.repository.interface';
import { AUTH_REPOSITORY } from '../../domain/repositories/auth-repository.token';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
    configService: ConfigService,
  ) {
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envs.jwtSecret,
    };
    super(options);
  }

  async validate(payload: JwtPayload) {
    const { id, username, institucionId } = payload;

    const user = await this.authRepository.findUserByUsername(
      username,
      institucionId,
    );

    if (!user) {
      throw new UnauthorizedException('Token no válido');
    }

    if (!user.estado) {
      throw new UnauthorizedException(
        'Usuario está inactivo, hable con un administrador',
      );
    }

    return user;
  }
}
