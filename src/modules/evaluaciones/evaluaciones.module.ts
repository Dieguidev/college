import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

// Repositorios
import {
  TIPO_EVALUACION_REPOSITORY,
  EVALUACION_REPOSITORY,
  CALIFICACION_REPOSITORY,
} from './domain/repositories/evaluaciones-repository.token';

import {
  TipoEvaluacionRepository,
  EvaluacionRepository,
  CalificacionRepository,
} from './infrastructure/repositories';

// Casos de uso
import {
  // TipoEvaluacion
  CreateTipoEvaluacionUseCase,
  GetAllTiposEvaluacionUseCase,
  GetTipoEvaluacionByIdUseCase,
  UpdateTipoEvaluacionUseCase,
  DeleteTipoEvaluacionUseCase,

  // Evaluacion
  CreateEvaluacionUseCase,
  GetAllEvaluacionesUseCase,
  GetEvaluacionByIdUseCase,
  GetEvaluacionesByClaseUseCase,
  GetEvaluacionesByPeriodoUseCase,
  GetEvaluacionesByTipoUseCase,
  GetEvaluacionesByRangoFechasUseCase,
  UpdateEvaluacionUseCase,
  DeleteEvaluacionUseCase,
  PublicarEvaluacionUseCase,
  DespublicarEvaluacionUseCase,

  // Calificacion
  CreateCalificacionUseCase,
  CrearCalificacionesMasivasUseCase,
  GetAllCalificacionesUseCase,
  GetCalificacionByIdUseCase,
  GetCalificacionesByEvaluacionUseCase,
  GetCalificacionesByEstudianteUseCase,
  GetCalificacionByEvaluacionYEstudianteUseCase,
  UpdateCalificacionUseCase,
  ActualizarCalificacionesMasivasUseCase,
  DeleteCalificacionUseCase,
  GetPromedioByEstudianteYClaseUseCase,
  GetPromedioByEstudianteYPeriodoUseCase,
} from './application/use-cases';

// Controladores
import {
  TipoEvaluacionController,
  EvaluacionController,
  CalificacionController,
} from './interfaces/controllers';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [
    TipoEvaluacionController,
    EvaluacionController,
    CalificacionController,
  ],
  providers: [
    // Repositorios
    {
      provide: TIPO_EVALUACION_REPOSITORY,
      useClass: TipoEvaluacionRepository,
    },
    {
      provide: EVALUACION_REPOSITORY,
      useClass: EvaluacionRepository,
    },
    {
      provide: CALIFICACION_REPOSITORY,
      useClass: CalificacionRepository,
    },

    // Casos de uso - TipoEvaluacion
    CreateTipoEvaluacionUseCase,
    GetAllTiposEvaluacionUseCase,
    GetTipoEvaluacionByIdUseCase,
    UpdateTipoEvaluacionUseCase,
    DeleteTipoEvaluacionUseCase,

    // Casos de uso - Evaluacion
    CreateEvaluacionUseCase,
    GetAllEvaluacionesUseCase,
    GetEvaluacionByIdUseCase,
    GetEvaluacionesByClaseUseCase,
    GetEvaluacionesByPeriodoUseCase,
    GetEvaluacionesByTipoUseCase,
    GetEvaluacionesByRangoFechasUseCase,
    UpdateEvaluacionUseCase,
    DeleteEvaluacionUseCase,
    PublicarEvaluacionUseCase,
    DespublicarEvaluacionUseCase,

    // Casos de uso - Calificacion
    CreateCalificacionUseCase,
    CrearCalificacionesMasivasUseCase,
    GetAllCalificacionesUseCase,
    GetCalificacionByIdUseCase,
    GetCalificacionesByEvaluacionUseCase,
    GetCalificacionesByEstudianteUseCase,
    GetCalificacionByEvaluacionYEstudianteUseCase,
    UpdateCalificacionUseCase,
    ActualizarCalificacionesMasivasUseCase,
    DeleteCalificacionUseCase,
    GetPromedioByEstudianteYClaseUseCase,
    GetPromedioByEstudianteYPeriodoUseCase,
  ],
  exports: [
    // Exportar cualquier servicio que necesite ser utilizado por otros módulos
  ],
})
export class EvaluacionesModule {}
