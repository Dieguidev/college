import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AsignarEstudianteDto } from '../dto';
import { IApoderadosRepository } from '../../domain/repositories/apoderados.repository.interface';
import { APODERADOS_REPOSITORY } from '../../domain/repositories/apoderados-repository.token';

@Injectable()
export class AsignarEstudianteUseCase {
  constructor(
    @Inject(APODERADOS_REPOSITORY)
    private readonly apoderadosRepository: IApoderadosRepository,
  ) {}

  async execute(asignarEstudianteDto: AsignarEstudianteDto) {
    try {
      // Asignar el estudiante al apoderado
      const relacion =
        await this.apoderadosRepository.asignarEstudiante(asignarEstudianteDto);

      return {
        id: relacion.id,
        apoderadoId: relacion.apoderadoId,
        estudianteId: relacion.estudianteId,
        parentesco: relacion.parentesco,
        esPrincipal: relacion.esPrincipal,
      };
    } catch (error) {
      // Manejar errores específicos de Prisma
      if (error.code === 'P2002') {
        throw new BadRequestException(
          `Ya existe una relación entre el apoderado ID ${asignarEstudianteDto.apoderadoId} y el estudiante ID ${asignarEstudianteDto.estudianteId}`,
        );
      }

      if (error.code === 'P2003') {
        if (error.meta?.field_name?.includes('apoderadoId')) {
          throw new NotFoundException(
            `No se encontró un apoderado con id ${asignarEstudianteDto.apoderadoId}`,
          );
        }
        if (error.meta?.field_name?.includes('estudianteId')) {
          throw new NotFoundException(
            `No se encontró un estudiante con id ${asignarEstudianteDto.estudianteId}`,
          );
        }
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
        'Ocurrió un error al asignar el estudiante al apoderado',
      );
    }
  }
}
