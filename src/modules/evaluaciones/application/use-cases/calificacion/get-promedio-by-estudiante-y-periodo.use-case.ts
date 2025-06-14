import { Injectable, Inject } from '@nestjs/common';
import { CALIFICACION_REPOSITORY } from '../../../domain/repositories/evaluaciones-repository.token';
import { CalificacionRepositoryInterface } from '../../../domain/repositories/calificacion.repository.interface';

@Injectable()
export class GetPromedioByEstudianteYPeriodoUseCase {
  constructor(
    @Inject(CALIFICACION_REPOSITORY)
    private readonly calificacionRepository: CalificacionRepositoryInterface,
  ) {}

  async execute(
    estudianteId: number,
    periodoAcademicoId: number,
    institucionId: number,
  ): Promise<number> {
    return this.calificacionRepository.getPromedioByEstudianteYPeriodo(
      estudianteId,
      periodoAcademicoId,
      institucionId,
    );
  }
}
