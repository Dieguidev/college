// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\evaluaciones\application\use-cases\tipo-evaluacion\create-tipo-evaluacion.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { TIPO_EVALUACION_REPOSITORY } from '../../../domain/repositories/evaluaciones-repository.token';
import { TipoEvaluacionRepositoryInterface } from '../../../domain/repositories/tipo-evaluacion.repository.interface';
import { CreateTipoEvaluacionDto } from '../../dto/create-tipo-evaluacion.dto';
import { TipoEvaluacion } from '../../../domain/entities/tipo-evaluacion.entity';

@Injectable()
export class CreateTipoEvaluacionUseCase {
  constructor(
    @Inject(TIPO_EVALUACION_REPOSITORY)
    private readonly tipoEvaluacionRepository: TipoEvaluacionRepositoryInterface,
  ) {}

  async execute(
    createTipoEvaluacionDto: CreateTipoEvaluacionDto,
    institucionId: number,
  ): Promise<TipoEvaluacion> {
    return this.tipoEvaluacionRepository.create(
      createTipoEvaluacionDto,
      institucionId,
    );
  }
}
