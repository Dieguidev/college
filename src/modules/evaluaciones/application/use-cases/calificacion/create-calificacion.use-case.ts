import { Injectable, Inject } from '@nestjs/common';
import { CALIFICACION_REPOSITORY } from '../../../domain/repositories/evaluaciones-repository.token';
import { CalificacionRepositoryInterface } from '../../../domain/repositories/calificacion.repository.interface';
import { CreateCalificacionDto } from '../../dto/create-calificacion.dto';
import { Calificacion } from '../../../domain/entities/calificacion.entity';

@Injectable()
export class CreateCalificacionUseCase {
  constructor(
    @Inject(CALIFICACION_REPOSITORY)
    private readonly calificacionRepository: CalificacionRepositoryInterface,
  ) {}

  async execute(
    createCalificacionDto: CreateCalificacionDto,
    institucionId: number,
  ): Promise<Calificacion> {
    return this.calificacionRepository.create(
      createCalificacionDto,
      institucionId,
    );
  }
}
