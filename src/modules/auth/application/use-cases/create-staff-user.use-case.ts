import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateStaffDto } from '../dto';
import { IAuthRepository } from '../../domain/repositories/auth.repository.interface';
import { AUTH_REPOSITORY } from '../../domain/repositories/auth-repository.token';

@Injectable()
export class CreateStaffUserUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
  ) {}
  async execute(createStaffDto: CreateStaffDto, institucionId: number) {
    try {
      // Crear el usuario del personal
      const user = await this.authRepository.createStaffUser(
        createStaffDto,
        institucionId,
      );

      // Devolver datos relevantes sin información sensible
      return {
        id: user.id,
        username: user.username,
        personalId: user.personalId,
        rol: user.rol,
        institucionId: user.institucionId,
      };
    } catch (error) {
      // Manejar errores específicos de Prisma
      if (error.code === 'P2002') {
        if (error.meta?.target?.includes('dni')) {
          throw new BadRequestException(
            `Ya existe un miembro del personal con el DNI ${createStaffDto.dni}`,
          );
        }
        if (error.meta?.target?.includes('email')) {
          throw new BadRequestException(
            `El correo electrónico ${createStaffDto.email} ya está en uso`,
          );
        }
        throw new BadRequestException('Ya existe un registro con esos datos');
      }

      // Si no es un error que ya estemos manejando explícitamente, lo propagamos
      if (error instanceof BadRequestException) {
        throw error;
      }

      console.error(error);
      throw new InternalServerErrorException(
        'Ocurrió un error al crear el usuario del personal',
      );
    }
  }
}
