import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IApoderadosRepository } from '../../domain/repositories/apoderados.repository.interface';
import { APODERADOS_REPOSITORY } from '../../domain/repositories/apoderados-repository.token';

@Injectable()
export class GetApoderadosPorEstudianteUseCase {
  constructor(
    @Inject(APODERADOS_REPOSITORY)
    private readonly apoderadosRepository: IApoderadosRepository,
  ) {}

  async execute(estudianteId: number, institucionId: number) {
    try {
      const apoderados =
        await this.apoderadosRepository.getApoderadosPorEstudiante(
          estudianteId,
          institucionId,
        );

      if (apoderados.length === 0) {
        return {
          message: `El estudiante con id ${estudianteId} no tiene apoderados asignados`,
          apoderados: [],
        };
      }

      return { apoderados };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Ocurrió un error al obtener los apoderados del estudiante',
      );
    }
  }
}
