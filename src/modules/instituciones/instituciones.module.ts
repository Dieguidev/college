import { Module } from '@nestjs/common';
import { InstitucionesController } from './interfaces/controllers';
import { CreateInstitucionUseCase } from './application/use-cases';
import { InstitucionesRepository } from './infrastructure/repositories/instituciones.repository';
import { INSTITUCIONES_REPOSITORY } from './domain/repositories/instituciones-repository.token';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule, // Importamos el módulo de autenticación para usar sus decoradores
  ],
  controllers: [InstitucionesController],
  providers: [
    // Casos de uso
    CreateInstitucionUseCase,

    // Repositorios
    {
      provide: INSTITUCIONES_REPOSITORY,
      useClass: InstitucionesRepository,
    },
    InstitucionesRepository,
  ],
  exports: [INSTITUCIONES_REPOSITORY],
})
export class InstitucionesModule {}
