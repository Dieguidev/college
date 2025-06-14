import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { TIPO_EVALUACION_REPOSITORY } from '../../../domain/repositories/evaluaciones-repository.token';
import { TipoEvaluacionRepositoryInterface } from '../../../domain/repositories/tipo-evaluacion.repository.interface';
import { UpdateTipoEvaluacionDto } from '../../dto/update-tipo-evaluacion.dto';
import { TipoEvaluacion } from '../../../domain/entities/tipo-evaluacion.entity';

@Injectable()
export class UpdateTipoEvaluacionUseCase {
  constructor(
    @Inject(TIPO_EVALUACION_REPOSITORY)
    private readonly tipoEvaluacionRepository: TipoEvaluacionRepositoryInterface,
  ) {}

  async execute(
    id: number,
    updateTipoEvaluacionDto: UpdateTipoEvaluacionDto,
    institucionId: number,
  ): Promise<TipoEvaluacion> {
    // Verificar que el tipo de evaluación existe
    const tipoExistente = await this.tipoEvaluacionRepository.findById(
      id,
      institucionId,
    );
    if (!tipoExistente) {
      throw new NotFoundException(
        `Tipo de evaluación con ID ${id} no encontrado`,
      );
    }

    // Actualizar el tipo de evaluación
    return this.tipoEvaluacionRepository.update(
      id,
      updateTipoEvaluacionDto,
      institucionId,
    );
  }
}
