import { Module } from '@nestjs/common';
import { EstudiantesController } from './interfaces/controllers';
import {
  CreateEstudianteUseCase,
  DeleteEstudianteUseCase,
  GetAllEstudiantesUseCase,
  GetEstudianteByIdUseCase,
  UpdateEstudianteUseCase,
} from './application/use-cases';
import { EstudiantesRepository } from './infrastructure/repositories';
import { ESTUDIANTES_REPOSITORY } from './domain/repositories/estudiantes-repository.token';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule, // Importamos el módulo de autenticación para usar sus decoradores y estrategias
  ],
  controllers: [EstudiantesController],
  providers: [
    // Casos de uso
    CreateEstudianteUseCase,
    GetAllEstudiantesUseCase,
    GetEstudianteByIdUseCase,
    UpdateEstudianteUseCase,
    DeleteEstudianteUseCase,

    // Repositorios
    {
      provide: ESTUDIANTES_REPOSITORY,
      useClass: EstudiantesRepository,
    },
    EstudiantesRepository,
  ],
  exports: [ESTUDIANTES_REPOSITORY],
})
export class EstudiantesModule {}
