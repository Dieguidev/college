import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CALIFICACION_REPOSITORY } from '../../../domain/repositories/evaluaciones-repository.token';
import { CalificacionRepositoryInterface } from '../../../domain/repositories/calificacion.repository.interface';
import { Calificacion } from '../../../domain/entities/calificacion.entity';

@Injectable()
export class DeleteCalificacionUseCase {
  constructor(
    @Inject(CALIFICACION_REPOSITORY)
    private readonly calificacionRepository: CalificacionRepositoryInterface,
  ) {}

  async execute(id: number, institucionId: number): Promise<Calificacion> {
    // Verificar que la calificación existe
    const calificacionExistente = await this.calificacionRepository.findById(
      id,
      institucionId,
    );
    if (!calificacionExistente) {
      throw new NotFoundException(`Calificación con ID ${id} no encontrada`);
    }

    // Eliminar (soft delete) la calificación
    return this.calificacionRepository.delete(id, institucionId);
  }
}
