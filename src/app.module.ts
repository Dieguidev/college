import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { InstitucionesModule } from './modules/instituciones/instituciones.module';
import { PersonalModule } from './modules/personal/personal.module';
import { EstudiantesModule } from './modules/estudiantes/estudiantes.module';
import { ApoderadosModule } from './modules/apoderados/apoderados.module';
import { AcademicoModule } from './modules/academico/academico.module';
import { HorariosModule } from './modules/horarios/horarios.module';
import { EvaluacionesModule } from './modules/evaluaciones/evaluaciones.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    InstitucionesModule,
    PersonalModule,
    EstudiantesModule,
    ApoderadosModule,
    AcademicoModule,
    HorariosModule,
    EvaluacionesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
