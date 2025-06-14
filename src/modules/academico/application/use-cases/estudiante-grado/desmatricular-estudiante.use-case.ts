// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\estudiante-grado\desmatricular-estudiante.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  ESTUDIANTE_GRADO_REPOSITORY,
  GRADO_REPOSITORY,
} from '../../../domain/repositories/academico-repository.token';
import { IEstudianteGradoRepository } from '../../../domain/repositories/estudiante-grado.repository.interface';
import { IGradoRepository } from '../../../domain/repositories/grado.repository.interface';

@Injectable()
export class DesmatricularEstudianteUseCase {
  constructor(
    @Inject(ESTUDIANTE_GRADO_REPOSITORY)
    private readonly estudianteGradoRepository: IEstudianteGradoRepository,
    @Inject(GRADO_REPOSITORY)
    private readonly gradoRepository: IGradoRepository,
  ) {}

  async execute(
    estudianteId: number,
    gradoId: number,
    institucionId: number,
  ): Promise<void> {
    // Verificamos que exista el grado
    const grado = await this.gradoRepository.findById(gradoId, institucionId);
    if (!grado) {
      throw new NotFoundException(`Grado con ID ${gradoId} no encontrado`);
    }

    // Verificamos si el estudiante está matriculado en el grado
    const matriculasExistentes =
      await this.estudianteGradoRepository.findByEstudiante(
        estudianteId,
        institucionId,
      );

    const matriculaEnGrado = matriculasExistentes.find(
      (matricula) => matricula.gradoId === gradoId,
    );

    if (!matriculaEnGrado) {
      throw new NotFoundException(
        `El estudiante con ID ${estudianteId} no está matriculado en el grado con ID ${gradoId}`,
      );
    }

    return this.estudianteGradoRepository.desmatricularEstudiante(
      estudianteId,
      gradoId,
      institucionId,
    );
  }
}
