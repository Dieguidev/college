import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { EVALUACION_REPOSITORY } from '../../../domain/repositories/evaluaciones-repository.token';
import { EvaluacionRepositoryInterface } from '../../../domain/repositories/evaluacion.repository.interface';
import { Evaluacion } from '../../../domain/entities/evaluacion.entity';

@Injectable()
export class PublicarEvaluacionUseCase {
  constructor(
    @Inject(EVALUACION_REPOSITORY)
    private readonly evaluacionRepository: EvaluacionRepositoryInterface,
  ) {}

  async execute(id: number, institucionId: number): Promise<Evaluacion> {
    // Verificar que la evaluación existe
    const evaluacionExistente = await this.evaluacionRepository.findById(
      id,
      institucionId,
    );
    if (!evaluacionExistente) {
      throw new NotFoundException(`Evaluación con ID ${id} no encontrada`);
    }

    // Publicar la evaluación
    return this.evaluacionRepository.publicar(id, institucionId);
  }
}
