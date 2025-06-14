import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CALIFICACION_REPOSITORY } from '../../../domain/repositories/evaluaciones-repository.token';
import { CalificacionRepositoryInterface } from '../../../domain/repositories/calificacion.repository.interface';
import { UpdateCalificacionDto } from '../../dto/update-calificacion.dto';
import { Calificacion } from '../../../domain/entities/calificacion.entity';

@Injectable()
export class UpdateCalificacionUseCase {
  constructor(
    @Inject(CALIFICACION_REPOSITORY)
    private readonly calificacionRepository: CalificacionRepositoryInterface,
  ) {}

  async execute(
    id: number,
    updateCalificacionDto: UpdateCalificacionDto,
    institucionId: number,
  ): Promise<Calificacion> {
    // Verificar que la calificación existe
    const calificacionExistente = await this.calificacionRepository.findById(
      id,
      institucionId,
    );
    if (!calificacionExistente) {
      throw new NotFoundException(`Calificación con ID ${id} no encontrada`);
    }

    // Actualizar la calificación
    return this.calificacionRepository.update(
      id,
      updateCalificacionDto,
      institucionId,
    );
  }
}
