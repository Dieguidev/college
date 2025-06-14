// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\apoderados\apoderados.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { APODERADOS_REPOSITORY } from './domain/repositories/apoderados-repository.token';
import { ApoderadosRepository } from './infrastructure/repositories';
import { ApoderadosController } from './interfaces/controllers';
import {
  CreateApoderadoUseCase,
  GetAllApoderadosUseCase,
  GetApoderadoByIdUseCase,
  UpdateApoderadoUseCase,
  DeleteApoderadoUseCase,
  AsignarEstudianteUseCase,
  GetApoderadosPorEstudianteUseCase,
  GetEstudiantesPorApoderadoUseCase,
  RemoverEstudianteUseCase,
} from './application/use-cases';

@Module({
  imports: [PrismaModule],
  controllers: [ApoderadosController],
  providers: [
    // Use cases
    CreateApoderadoUseCase,
    GetAllApoderadosUseCase,
    GetApoderadoByIdUseCase,
    UpdateApoderadoUseCase,
    DeleteApoderadoUseCase,
    AsignarEstudianteUseCase,
    GetApoderadosPorEstudianteUseCase,
    GetEstudiantesPorApoderadoUseCase,
    RemoverEstudianteUseCase,

    // Repositories
    {
      provide: APODERADOS_REPOSITORY,
      useClass: ApoderadosRepository,
    },
  ],
  exports: [
    // Exportamos los casos de uso para que otros módulos puedan utilizarlos
    CreateApoderadoUseCase,
    GetApoderadoByIdUseCase,
    GetApoderadosPorEstudianteUseCase,
  ],
})
export class ApoderadosModule {}
