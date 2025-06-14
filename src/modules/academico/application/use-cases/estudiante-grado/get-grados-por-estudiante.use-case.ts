// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\estudiante-grado\get-grados-por-estudiante.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { EstudianteGrado } from '../../../domain/entities';
import { ESTUDIANTE_GRADO_REPOSITORY } from '../../../domain/repositories/academico-repository.token';
import { IEstudianteGradoRepository } from '../../../domain/repositories/estudiante-grado.repository.interface';

@Injectable()
export class GetGradosPorEstudianteUseCase {
  constructor(
    @Inject(ESTUDIANTE_GRADO_REPOSITORY)
    private readonly estudianteGradoRepository: IEstudianteGradoRepository,
  ) {}

  async execute(
    estudianteId: number,
    institucionId: number,
  ): Promise<EstudianteGrado[]> {
    return this.estudianteGradoRepository.findByEstudiante(
      estudianteId,
      institucionId,
    );
  }
}
