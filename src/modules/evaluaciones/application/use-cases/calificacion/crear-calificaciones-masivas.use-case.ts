import { Injectable, Inject } from '@nestjs/common';
import {
  CALIFICACION_REPOSITORY,
  EVALUACION_REPOSITORY,
} from '../../../domain/repositories/evaluaciones-repository.token';
import { CalificacionRepositoryInterface } from '../../../domain/repositories/calificacion.repository.interface';
import { EvaluacionRepositoryInterface } from '../../../domain/repositories/evaluacion.repository.interface';
import { CrearCalificacionesMasivasDto } from '../../dto/crear-calificaciones-masivas.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CrearCalificacionesMasivasUseCase {
  constructor(
    @Inject(CALIFICACION_REPOSITORY)
    private readonly calificacionRepository: CalificacionRepositoryInterface,
    @Inject(EVALUACION_REPOSITORY)
    private readonly evaluacionRepository: EvaluacionRepositoryInterface,
  ) {}

  async execute(
    crearCalificacionesMasivasDto: CrearCalificacionesMasivasDto,
    institucionId: number,
  ): Promise<number> {
    // Verificar que la evaluación existe
    const evaluacion = await this.evaluacionRepository.findById(
      crearCalificacionesMasivasDto.evaluacionId,
      institucionId,
    );
    if (!evaluacion) {
      throw new NotFoundException(
        `Evaluación con ID ${crearCalificacionesMasivasDto.evaluacionId} no encontrada`,
      );
    }

    // Preparar las calificaciones con el ID de la evaluación
    const calificaciones = crearCalificacionesMasivasDto.calificaciones.map(
      (cal) => ({
        evaluacionId: crearCalificacionesMasivasDto.evaluacionId,
        estudianteId: cal.estudianteId,
        puntaje: cal.puntaje,
        nota: cal.nota,
        observaciones: cal.observaciones,
      }),
    );

    // Crear las calificaciones en masa
    return this.calificacionRepository.createMany(
      calificaciones,
      institucionId,
    );
  }
}
