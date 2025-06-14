// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\academico.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

// Repositories
import {
  AnioAcademicoRepository,
  NivelRepository,
  GradoRepository,
  CursoRepository,
  ClaseRepository,
  EstudianteGradoRepository,
} from './infrastructure/repositories';

// Repository Tokens
import {
  ANIO_ACADEMICO_REPOSITORY,
  NIVEL_REPOSITORY,
  GRADO_REPOSITORY,
  CURSO_REPOSITORY,
  CLASE_REPOSITORY,
  ESTUDIANTE_GRADO_REPOSITORY,
} from './domain/repositories';

// Use Cases
import {
  // AnioAcademico
  CreateAnioAcademicoUseCase,
  GetAllAniosAcademicosUseCase,
  GetAnioAcademicoByIdUseCase,
  UpdateAnioAcademicoUseCase,
  DeleteAnioAcademicoUseCase,
  GetActiveAnioAcademicoUseCase,
  ActivateAnioAcademicoUseCase,

  // Nivel
  CreateNivelUseCase,
  GetAllNivelesUseCase,
  GetNivelByIdUseCase,
  UpdateNivelUseCase,
  DeleteNivelUseCase,

  // Grado
  CreateGradoUseCase,
  GetAllGradosUseCase,
  GetGradoByIdUseCase,
  GetGradosByNivelUseCase,
  GetGradosByAnioAcademicoUseCase,
  UpdateGradoUseCase,
  DeleteGradoUseCase,

  // Curso
  CreateCursoUseCase,
  GetAllCursosUseCase,
  GetCursoByIdUseCase,
  UpdateCursoUseCase,
  DeleteCursoUseCase,

  // Clase
  CreateClaseUseCase,
  GetAllClasesUseCase,
  GetClaseByIdUseCase,
  GetClasesByGradoUseCase,
  GetClasesByCursoUseCase,
  GetClasesByProfesorUseCase,
  UpdateClaseUseCase,
  DeleteClaseUseCase,

  // EstudianteGrado
  MatricularEstudianteUseCase,
  DesmatricularEstudianteUseCase,
  GetEstudiantesPorGradoUseCase,
  GetGradosPorEstudianteUseCase,
} from './application/use-cases';

// Controllers
import {
  AnioAcademicoController,
  NivelController,
  GradoController,
  CursoController,
  ClaseController,
  EstudianteGradoController,
} from './interfaces/controllers';

@Module({
  controllers: [
    AnioAcademicoController,
    NivelController,
    GradoController,
    CursoController,
    ClaseController,
    EstudianteGradoController,
  ],
  providers: [
    PrismaService,

    // Repositories
    {
      provide: ANIO_ACADEMICO_REPOSITORY,
      useClass: AnioAcademicoRepository,
    },
    {
      provide: NIVEL_REPOSITORY,
      useClass: NivelRepository,
    },
    {
      provide: GRADO_REPOSITORY,
      useClass: GradoRepository,
    },
    {
      provide: CURSO_REPOSITORY,
      useClass: CursoRepository,
    },
    {
      provide: CLASE_REPOSITORY,
      useClass: ClaseRepository,
    },
    {
      provide: ESTUDIANTE_GRADO_REPOSITORY,
      useClass: EstudianteGradoRepository,
    },

    // Use Cases - AnioAcademico
    CreateAnioAcademicoUseCase,
    GetAllAniosAcademicosUseCase,
    GetAnioAcademicoByIdUseCase,
    UpdateAnioAcademicoUseCase,
    DeleteAnioAcademicoUseCase,
    GetActiveAnioAcademicoUseCase,
    ActivateAnioAcademicoUseCase,

    // Use Cases - Nivel
    CreateNivelUseCase,
    GetAllNivelesUseCase,
    GetNivelByIdUseCase,
    UpdateNivelUseCase,
    DeleteNivelUseCase,

    // Use Cases - Grado
    CreateGradoUseCase,
    GetAllGradosUseCase,
    GetGradoByIdUseCase,
    GetGradosByNivelUseCase,
    GetGradosByAnioAcademicoUseCase,
    UpdateGradoUseCase,
    DeleteGradoUseCase,

    // Use Cases - Curso
    CreateCursoUseCase,
    GetAllCursosUseCase,
    GetCursoByIdUseCase,
    UpdateCursoUseCase,
    DeleteCursoUseCase,

    // Use Cases - Clase
    CreateClaseUseCase,
    GetAllClasesUseCase,
    GetClaseByIdUseCase,
    GetClasesByGradoUseCase,
    GetClasesByCursoUseCase,
    GetClasesByProfesorUseCase,
    UpdateClaseUseCase,
    DeleteClaseUseCase,

    // Use Cases - EstudianteGrado
    MatricularEstudianteUseCase,
    DesmatricularEstudianteUseCase,
    GetEstudiantesPorGradoUseCase,
    GetGradosPorEstudianteUseCase,
  ],
  exports: [
    // Use Cases - AnioAcademico
    CreateAnioAcademicoUseCase,
    GetAllAniosAcademicosUseCase,
    GetAnioAcademicoByIdUseCase,
    UpdateAnioAcademicoUseCase,
    DeleteAnioAcademicoUseCase,
    GetActiveAnioAcademicoUseCase,
    ActivateAnioAcademicoUseCase,

    // Use Cases - Nivel
    CreateNivelUseCase,
    GetAllNivelesUseCase,
    GetNivelByIdUseCase,
    UpdateNivelUseCase,
    DeleteNivelUseCase,

    // Use Cases - Grado
    CreateGradoUseCase,
    GetAllGradosUseCase,
    GetGradoByIdUseCase,
    GetGradosByNivelUseCase,
    GetGradosByAnioAcademicoUseCase,
    UpdateGradoUseCase,
    DeleteGradoUseCase,

    // Use Cases - Curso
    CreateCursoUseCase,
    GetAllCursosUseCase,
    GetCursoByIdUseCase,
    UpdateCursoUseCase,
    DeleteCursoUseCase,

    // Use Cases - Clase
    CreateClaseUseCase,
    GetAllClasesUseCase,
    GetClaseByIdUseCase,
    GetClasesByGradoUseCase,
    GetClasesByCursoUseCase,
    GetClasesByProfesorUseCase,
    UpdateClaseUseCase,
    DeleteClaseUseCase,

    // Use Cases - EstudianteGrado
    MatricularEstudianteUseCase,
    DesmatricularEstudianteUseCase,
    GetEstudiantesPorGradoUseCase,
    GetGradosPorEstudianteUseCase,
  ],
})
export class AcademicoModule {}
