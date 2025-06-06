import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { CreateStudentDto, LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { Rol } from '@prisma/client';

import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async signJWT(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async registerStudent(createStudentDto: CreateStudentDto) {
    const {
      password,
      rol = Rol.ESTUDIANTE,
      dni,
      nombres,
      apellidos,
      fechaNacimiento,
      genero,
      direccion,
      telefono,
      email,
    } = createStudentDto;

    try {
      // Generamos un nombre de usuario basado en el nombre y apellido
      // Tomamos la primera letra del nombre + el primer apellido
      const nombreBase =
        nombres.charAt(0).toLowerCase() + apellidos.split(' ')[0].toLowerCase();

      // Verificamos si ese nombre de usuario ya existe
      let username = nombreBase;
      let counter = 1;
      let usernameExists = true;

      // Buscar un nombre de usuario disponible
      while (usernameExists) {
        const existingUser = await this.prisma.usuario.findUnique({
          where: { username },
        });

        if (!existingUser) {
          usernameExists = false;
        } else {
          // Si ya existe, añadimos un contador al final
          username = `${nombreBase}${counter}`;
          counter++;
        }
      }

      // Verificar si ya existe un estudiante con ese DNI
      const existingStudent = await this.prisma.estudiante.findUnique({
        where: { dni },
      });

      if (existingStudent) {
        throw new BadRequestException('Ya existe un estudiante con ese DNI');
      }

      // Utilizamos una transacción para asegurar que tanto el estudiante como el usuario se creen juntos
      const result = await this.prisma.$transaction(async (prisma) => {
        // 1. Crear el estudiante primero
        const estudiante = await prisma.estudiante.create({
          data: {
            dni,
            nombres,
            apellidos,
            fechaNacimiento,
            genero,
            direccion,
            telefono,
            email,
          },
        });

        // 2. Crear el usuario asociado al estudiante
        const usuario = await prisma.usuario.create({
          data: {
            username,
            password: bcrypt.hashSync(password, 10),
            rol,
            estudianteId: estudiante.id, // Vinculamos el usuario con el estudiante
          },
        });

        // Retornamos ambos objetos creados
        return { estudiante, usuario };
      });

      // Eliminamos la contraseña de la respuesta por seguridad
      const { password: _, ...userWithoutPassword } = result.usuario;

      return {
        estudiante: result.estudiante,
        user: userWithoutPassword,
        token: await this.signJWT({ id: result.usuario.id }),
      };
    } catch (error) {
      this.logger.error(`Error registrando estudiante: ${error.message}`);

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new BadRequestException(
        `Error al crear el estudiante: ${error.message}`,
      );
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    try {
      const user = await this.prisma.usuario.findUnique({
        where: {
          username: email,
        },
      });

      if (!user) {
        throw new BadRequestException('Email not found');
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        throw new BadRequestException('Password not valid');
      }

      const { password: _, ...userWithoutPassword } = user;
      return {
        user: userWithoutPassword,
        token: await this.signJWT({ id: user.id }),
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async checkAuthStatus(user) {
    return {
      user: user,
      token: await this.signJWT({ id: user.id }),
    };
  }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }

  private handleDBExceptions(error: any): void {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
