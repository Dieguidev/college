import { Module } from '@nestjs/common';
import { PersonalController } from './interfaces/controllers';
import {
  CreatePersonalUseCase,
  DeletePersonalUseCase,
  GetAllPersonalUseCase,
  GetPersonalByIdUseCase,
  UpdatePersonalUseCase,
} from './application/use-cases';
import { PersonalRepository } from './infrastructure/repositories';
import { PERSONAL_REPOSITORY } from './domain/repositories/personal-repository.token';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule, // Importamos el módulo de autenticación para usar sus decoradores y estrategias
  ],
  controllers: [PersonalController],
  providers: [
    // Casos de uso
    CreatePersonalUseCase,
    GetAllPersonalUseCase,
    GetPersonalByIdUseCase,
    UpdatePersonalUseCase,
    DeletePersonalUseCase,

    // Repositorios
    {
      provide: PERSONAL_REPOSITORY,
      useClass: PersonalRepository,
    },
    PersonalRepository,
  ],
  exports: [PERSONAL_REPOSITORY],
})
export class PersonalModule {}
