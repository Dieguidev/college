import { Injectable, Inject } from '@nestjs/common';
import { CALIFICACION_REPOSITORY } from '../../../domain/repositories/evaluaciones-repository.token';
import { CalificacionRepositoryInterface } from '../../../domain/repositories/calificacion.repository.interface';

@Injectable()
export class GetPromedioByEstudianteYClaseUseCase {
  constructor(
    @Inject(CALIFICACION_REPOSITORY)
    private readonly calificacionRepository: CalificacionRepositoryInterface,
  ) {}

  async execute(
    estudianteId: number,
    claseId: number,
    institucionId: number,
  ): Promise<number> {
    return this.calificacionRepository.getPromedioByEstudianteYClase(
      estudianteId,
      claseId,
      institucionId,
    );
  }
}
