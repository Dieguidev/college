import { Injectable, Inject } from '@nestjs/common';
import { CALIFICACION_REPOSITORY } from '../../../domain/repositories/evaluaciones-repository.token';
import { CalificacionRepositoryInterface } from '../../../domain/repositories/calificacion.repository.interface';
import { Calificacion } from '../../../domain/entities/calificacion.entity';

@Injectable()
export class GetAllCalificacionesUseCase {
  constructor(
    @Inject(CALIFICACION_REPOSITORY)
    private readonly calificacionRepository: CalificacionRepositoryInterface,
  ) {}

  async execute(institucionId: number): Promise<Calificacion[]> {
    return this.calificacionRepository.findAll(institucionId);
  }
}
