import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { envs } from 'src/config/envs';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly prisma: PrismaService,

    configService: ConfigService,
  ) {
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envs.jwtSecret,
    };
    super(options);
  }

  async validate(payload: JwtPayload) {
    const { id } = payload;
    const user = await this.prisma.usuario.findUnique({ where: { id } });

    if (!user) throw new UnauthorizedException('Token not valid');
    if (!user.estado)
      throw new UnauthorizedException('User is inactive, talk with an admin');
    return user;
  }
}
