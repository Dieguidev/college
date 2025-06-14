import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdatePersonalDto } from '../dto';
import { IPersonalRepository } from '../../domain/repositories/personal.repository.interface';
import { PERSONAL_REPOSITORY } from '../../domain/repositories/personal-repository.token';

@Injectable()
export class UpdatePersonalUseCase {
  constructor(
    @Inject(PERSONAL_REPOSITORY)
    private readonly personalRepository: IPersonalRepository,
  ) {}

  async execute(id: number, updatePersonalDto: UpdatePersonalDto) {
    try {
      const { institucionId } = updatePersonalDto;

      // Verificar si existe el miembro del personal
      const existingPersonal = await this.personalRepository.findById(
        id,
        institucionId,
      );

      if (!existingPersonal) {
        throw new NotFoundException(
          `No se encontró un miembro del personal con id ${id}`,
        );
      }

      // Actualizar el miembro del personal
      const personal = await this.personalRepository.update(
        id,
        updatePersonalDto,
        institucionId,
      );

      return {
        id: personal.id,
        dni: personal.dni,
        nombres: personal.nombres,
        apellidos: personal.apellidos,
        email: personal.email,
        telefono: personal.telefono,
        profesion: personal.profesion,
        estado: personal.estado,
        fechaContratacion: personal.fechaContratacion,
        institucionId: personal.institucionId,
      };
    } catch (error) {
      // Manejar errores específicos de Prisma
      if (error.code === 'P2002') {
        if (error.meta?.target?.includes('email')) {
          throw new BadRequestException(
            `El correo electrónico ${updatePersonalDto.email} ya está en uso`,
          );
        }
        throw new BadRequestException('Ya existe un registro con esos datos');
      }

      // Si no es un error que ya estemos manejando explícitamente, lo propagamos
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      console.error(error);
      throw new InternalServerErrorException(
        'Ocurrió un error al actualizar el miembro del personal',
      );
    }
  }
}
