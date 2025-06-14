import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  CALIFICACION_REPOSITORY,
  EVALUACION_REPOSITORY,
} from '../../../domain/repositories/evaluaciones-repository.token';
import { CalificacionRepositoryInterface } from '../../../domain/repositories/calificacion.repository.interface';
import { EvaluacionRepositoryInterface } from '../../../domain/repositories/evaluacion.repository.interface';
import { Calificacion } from '../../../domain/entities/calificacion.entity';

@Injectable()
export class GetCalificacionesByEvaluacionUseCase {
  constructor(
    @Inject(CALIFICACION_REPOSITORY)
    private readonly calificacionRepository: CalificacionRepositoryInterface,
    @Inject(EVALUACION_REPOSITORY)
    private readonly evaluacionRepository: EvaluacionRepositoryInterface,
  ) {}

  async execute(
    evaluacionId: number,
    institucionId: number,
  ): Promise<Calificacion[]> {
    // Verificar que la evaluación existe
    const evaluacion = await this.evaluacionRepository.findById(
      evaluacionId,
      institucionId,
    );
    if (!evaluacion) {
      throw new NotFoundException(
        `Evaluación con ID ${evaluacionId} no encontrada`,
      );
    }

    return this.calificacionRepository.findByEvaluacion(
      evaluacionId,
      institucionId,
    );
  }
}
