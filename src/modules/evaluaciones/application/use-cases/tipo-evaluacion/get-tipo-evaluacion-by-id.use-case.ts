// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\evaluaciones\application\use-cases\tipo-evaluacion\get-tipo-evaluacion-by-id.use-case.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { TIPO_EVALUACION_REPOSITORY } from '../../../domain/repositories/evaluaciones-repository.token';
import { TipoEvaluacionRepositoryInterface } from '../../../domain/repositories/tipo-evaluacion.repository.interface';
import { TipoEvaluacion } from '../../../domain/entities/tipo-evaluacion.entity';

@Injectable()
export class GetTipoEvaluacionByIdUseCase {
  constructor(
    @Inject(TIPO_EVALUACION_REPOSITORY)
    private readonly tipoEvaluacionRepository: TipoEvaluacionRepositoryInterface,
  ) {}

  async execute(id: number, institucionId: number): Promise<TipoEvaluacion> {
    const tipoEvaluacion = await this.tipoEvaluacionRepository.findById(
      id,
      institucionId,
    );
    if (!tipoEvaluacion) {
      throw new NotFoundException(
        `Tipo de evaluación con ID ${id} no encontrado`,
      );
    }
    return tipoEvaluacion;
  }
}
