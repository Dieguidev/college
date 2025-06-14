// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\estudiante-grado\get-estudiantes-por-grado.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  ESTUDIANTE_GRADO_REPOSITORY,
  GRADO_REPOSITORY,
} from '../../../domain/repositories/academico-repository.token';
import { IEstudianteGradoRepository } from '../../../domain/repositories/estudiante-grado.repository.interface';
import { IGradoRepository } from '../../../domain/repositories/grado.repository.interface';

@Injectable()
export class GetEstudiantesPorGradoUseCase {
  constructor(
    @Inject(ESTUDIANTE_GRADO_REPOSITORY)
    private readonly estudianteGradoRepository: IEstudianteGradoRepository,
    @Inject(GRADO_REPOSITORY)
    private readonly gradoRepository: IGradoRepository,
  ) {}

  async execute(gradoId: number, institucionId: number): Promise<any[]> {
    // Verificamos que exista el grado
    const grado = await this.gradoRepository.findById(gradoId, institucionId);
    if (!grado) {
      throw new NotFoundException(`Grado con ID ${gradoId} no encontrado`);
    }

    return this.estudianteGradoRepository.findEstudiantesEnGrado(
      gradoId,
      institucionId,
    );
  }
}
