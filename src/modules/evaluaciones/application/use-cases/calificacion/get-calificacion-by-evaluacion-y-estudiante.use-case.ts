import { Injectable, Inject } from '@nestjs/common';
import { CALIFICACION_REPOSITORY } from '../../../domain/repositories/evaluaciones-repository.token';
import { CalificacionRepositoryInterface } from '../../../domain/repositories/calificacion.repository.interface';
import { Calificacion } from '../../../domain/entities/calificacion.entity';

@Injectable()
export class GetCalificacionByEvaluacionYEstudianteUseCase {
  constructor(
    @Inject(CALIFICACION_REPOSITORY)
    private readonly calificacionRepository: CalificacionRepositoryInterface,
  ) {}

  async execute(
    evaluacionId: number,
    estudianteId: number,
    institucionId: number,
  ): Promise<Calificacion | null> {
    return this.calificacionRepository.findByEvaluacionYEstudiante(
      evaluacionId,
      estudianteId,
      institucionId,
    );
  }
}
