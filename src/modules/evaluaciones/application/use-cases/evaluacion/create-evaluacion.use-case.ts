import { Injectable, Inject } from '@nestjs/common';
import { EVALUACION_REPOSITORY } from '../../../domain/repositories/evaluaciones-repository.token';
import { EvaluacionRepositoryInterface } from '../../../domain/repositories/evaluacion.repository.interface';
import { CreateEvaluacionDto } from '../../dto/create-evaluacion.dto';
import { Evaluacion } from '../../../domain/entities/evaluacion.entity';

@Injectable()
export class CreateEvaluacionUseCase {
  constructor(
    @Inject(EVALUACION_REPOSITORY)
    private readonly evaluacionRepository: EvaluacionRepositoryInterface,
  ) {}

  async execute(
    createEvaluacionDto: CreateEvaluacionDto,
    institucionId: number,
  ): Promise<Evaluacion> {
    return this.evaluacionRepository.create(createEvaluacionDto, institucionId);
  }
}
