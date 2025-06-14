import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateApoderadoDto } from '../dto';
import { IApoderadosRepository } from '../../domain/repositories/apoderados.repository.interface';
import { APODERADOS_REPOSITORY } from '../../domain/repositories/apoderados-repository.token';

@Injectable()
export class CreateApoderadoUseCase {
  constructor(
    @Inject(APODERADOS_REPOSITORY)
    private readonly apoderadosRepository: IApoderadosRepository,
  ) {}

  async execute(createApoderadoDto: CreateApoderadoDto) {
    try {
      const { institucionId } = createApoderadoDto;

      // Verificar si ya existe un apoderado con el mismo DNI
      const existingApoderado = await this.apoderadosRepository.findByDni(
        createApoderadoDto.dni,
        institucionId,
      );

      if (existingApoderado) {
        throw new BadRequestException(
          `Ya existe un apoderado con el DNI ${createApoderadoDto.dni} en esta institución`,
        );
      }

      // Crear el apoderado
      const apoderado = await this.apoderadosRepository.create(
        createApoderadoDto,
        institucionId,
      );

      return {
        id: apoderado.id,
        dni: apoderado.dni,
        nombres: apoderado.nombres,
        apellidos: apoderado.apellidos,
        nombreCompleto: apoderado.nombreCompleto,
        telefono: apoderado.telefono,
        email: apoderado.email,
        ocupacion: apoderado.ocupacion,
        direccion: apoderado.direccion,
        institucionId: apoderado.institucionId,
      };
    } catch (error) {
      // Manejar errores específicos de Prisma
      if (error.code === 'P2002') {
        if (error.meta?.target?.includes('dni')) {
          throw new BadRequestException(
            `Ya existe un apoderado con el DNI ${createApoderadoDto.dni}`,
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
        'Ocurrió un error al crear el apoderado',
      );
    }
  }
}
