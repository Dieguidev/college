import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CALIFICACION_REPOSITORY } from '../../../domain/repositories/evaluaciones-repository.token';
import { CalificacionRepositoryInterface } from '../../../domain/repositories/calificacion.repository.interface';
import { ActualizarCalificacionesMasivasDto } from '../../dto/actualizar-calificaciones-masivas.dto';

@Injectable()
export class ActualizarCalificacionesMasivasUseCase {
  constructor(
    @Inject(CALIFICACION_REPOSITORY)
    private readonly calificacionRepository: CalificacionRepositoryInterface,
  ) {}

  async execute(
    actualizarCalificacionesDto: ActualizarCalificacionesMasivasDto,
    institucionId: number,
  ): Promise<number> {
    // Extraer los datos de las calificaciones a actualizar
    const calificaciones = actualizarCalificacionesDto.calificaciones.map(
      (cal) => ({
        id: cal.id,
        puntaje: cal.puntaje,
        nota: cal.nota,
        observaciones: cal.observaciones,
      }),
    );

    // Actualizar las calificaciones en masa
    return this.calificacionRepository.updateMany(
      calificaciones,
      institucionId,
    );
  }
}
