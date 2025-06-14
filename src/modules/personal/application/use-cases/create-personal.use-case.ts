import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonalDto } from '../dto';
import { IPersonalRepository } from '../../domain/repositories/personal.repository.interface';
import { PERSONAL_REPOSITORY } from '../../domain/repositories/personal-repository.token';

@Injectable()
export class CreatePersonalUseCase {
  constructor(
    @Inject(PERSONAL_REPOSITORY)
    private readonly personalRepository: IPersonalRepository,
  ) {}

  async execute(createPersonalDto: CreatePersonalDto) {
    try {
      const { institucionId } = createPersonalDto;

      // Verificar si ya existe un miembro del personal con el mismo DNI
      const existingPersonal = await this.personalRepository.findByDni(
        createPersonalDto.dni,
        institucionId,
      );

      if (existingPersonal) {
        throw new BadRequestException(
          `Ya existe un miembro del personal con el DNI ${createPersonalDto.dni} en esta institución`,
        );
      }

      // Crear el miembro del personal
      const personal = await this.personalRepository.create(
        createPersonalDto,
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
        if (error.meta?.target?.includes('dni')) {
          throw new BadRequestException(
            `Ya existe un miembro del personal con el DNI ${createPersonalDto.dni}`,
          );
        }
        if (error.meta?.target?.includes('email')) {
          throw new BadRequestException(
            `El correo electrónico ${createPersonalDto.email} ya está en uso`,
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
        'Ocurrió un error al crear el miembro del personal',
      );
    }
  }
}
