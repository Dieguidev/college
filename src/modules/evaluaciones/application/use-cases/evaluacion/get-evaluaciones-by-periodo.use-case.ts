import { Injectable, Inject } from '@nestjs/common';
import { EVALUACION_REPOSITORY } from '../../../domain/repositories/evaluaciones-repository.token';
import { EvaluacionRepositoryInterface } from '../../../domain/repositories/evaluacion.repository.interface';
import { Evaluacion } from '../../../domain/entities/evaluacion.entity';

@Injectable()
export class GetEvaluacionesByPeriodoUseCase {
  constructor(
    @Inject(EVALUACION_REPOSITORY)
    private readonly evaluacionRepository: EvaluacionRepositoryInterface,
  ) {}

  async execute(
    periodoAcademicoId: number,
    institucionId: number,
  ): Promise<Evaluacion[]> {
    return this.evaluacionRepository.findByPeriodoAcademico(
      periodoAcademicoId,
      institucionId,
    );
  }
}
