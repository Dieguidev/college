import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { EVALUACION_REPOSITORY } from '../../../domain/repositories/evaluaciones-repository.token';
import { EvaluacionRepositoryInterface } from '../../../domain/repositories/evaluacion.repository.interface';
import { Evaluacion } from '../../../domain/entities/evaluacion.entity';

@Injectable()
export class GetEvaluacionesByRangoFechasUseCase {
  constructor(
    @Inject(EVALUACION_REPOSITORY)
    private readonly evaluacionRepository: EvaluacionRepositoryInterface,
  ) {}

  async execute(
    fechaInicio: Date,
    fechaFin: Date,
    institucionId: number,
  ): Promise<Evaluacion[]> {
    // Validar que la fecha de inicio sea anterior a la fecha de fin
    if (fechaInicio > fechaFin) {
      throw new BadRequestException(
        'La fecha de inicio debe ser anterior a la fecha de fin',
      );
    }

    return this.evaluacionRepository.findByRangoFechas(
      fechaInicio,
      fechaFin,
      institucionId,
    );
  }
}
