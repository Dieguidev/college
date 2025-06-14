// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\horarios\horarios.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

// Repositories
import {
  HorarioRepository,
  PeriodoAcademicoRepository,
} from './infrastructure/repositories';

// Repository Tokens
import {
  HORARIO_REPOSITORY,
  PERIODO_ACADEMICO_REPOSITORY,
} from './domain/repositories';

// Use Cases
import {
  // Horario
  CreateHorarioUseCase,
  GetAllHorariosUseCase,
  GetHorarioByIdUseCase,
  GetHorariosByClaseUseCase,
  GetHorariosByDiaUseCase,
  GetHorariosByGradoUseCase,
  GetHorariosByProfesorUseCase,
  UpdateHorarioUseCase,
  DeleteHorarioUseCase,

  // Periodo Académico
  CreatePeriodoAcademicoUseCase,
  GetAllPeriodosAcademicosUseCase,
  GetPeriodoAcademicoByIdUseCase,
  GetPeriodosByAnioAcademicoUseCase,
  GetCurrentPeriodoAcademicoUseCase,
  UpdatePeriodoAcademicoUseCase,
  DeletePeriodoAcademicoUseCase,
} from './application/use-cases';

// Controllers
import {
  HorarioController,
  PeriodoAcademicoController,
} from './interfaces/controllers';

@Module({
  controllers: [HorarioController, PeriodoAcademicoController],
  providers: [
    PrismaService,

    // Repositories
    {
      provide: HORARIO_REPOSITORY,
      useClass: HorarioRepository,
    },
    {
      provide: PERIODO_ACADEMICO_REPOSITORY,
      useClass: PeriodoAcademicoRepository,
    },

    // Use Cases - Horario
    CreateHorarioUseCase,
    GetAllHorariosUseCase,
    GetHorarioByIdUseCase,
    GetHorariosByClaseUseCase,
    GetHorariosByDiaUseCase,
    GetHorariosByGradoUseCase,
    GetHorariosByProfesorUseCase,
    UpdateHorarioUseCase,
    DeleteHorarioUseCase,

    // Use Cases - Periodo Académico
    CreatePeriodoAcademicoUseCase,
    GetAllPeriodosAcademicosUseCase,
    GetPeriodoAcademicoByIdUseCase,
    GetPeriodosByAnioAcademicoUseCase,
    GetCurrentPeriodoAcademicoUseCase,
    UpdatePeriodoAcademicoUseCase,
    DeletePeriodoAcademicoUseCase,
  ],
  exports: [
    // Use Cases - Horario
    CreateHorarioUseCase,
    GetAllHorariosUseCase,
    GetHorarioByIdUseCase,
    GetHorariosByClaseUseCase,
    GetHorariosByDiaUseCase,
    GetHorariosByGradoUseCase,
    GetHorariosByProfesorUseCase,
    UpdateHorarioUseCase,
    DeleteHorarioUseCase,

    // Use Cases - Periodo Académico
    CreatePeriodoAcademicoUseCase,
    GetAllPeriodosAcademicosUseCase,
    GetPeriodoAcademicoByIdUseCase,
    GetPeriodosByAnioAcademicoUseCase,
    GetCurrentPeriodoAcademicoUseCase,
    UpdatePeriodoAcademicoUseCase,
    DeletePeriodoAcademicoUseCase,
  ],
})
export class HorariosModule {}
