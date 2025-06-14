import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';

import { INSTITUCION_REPOSITORY } from './domain/repositories/institucion-repository.token';
import { InstitucionRepository } from './infrastructure/repositories/institucion.repository';
import {
  CreateInstitucionUseCase,
  DeleteInstitucionUseCase,
  GetInstitucionByIdUseCase,
  GetInstitucionesUseCase,
  UpdateInstitucionUseCase,
} from './application/use-cases';
import { InstitucionController } from './presentation/controllers';

@Module({
  imports: [AuthModule],
  controllers: [InstitucionController],
  providers: [
    // Casos de uso
    CreateInstitucionUseCase,
    UpdateInstitucionUseCase,
    GetInstitucionesUseCase,
    GetInstitucionByIdUseCase,
    DeleteInstitucionUseCase,

    // Repositorios
    {
      provide: INSTITUCION_REPOSITORY,
      useClass: InstitucionRepository,
    },
  ],
  exports: [
    // Para que otros módulos puedan inyectar el repositorio de instituciones
    {
      provide: INSTITUCION_REPOSITORY,
      useClass: InstitucionRepository,
    },
  ],
})
export class InstitucionesModule {}
