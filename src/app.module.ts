import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { InstitucionesModule } from './modules/instituciones/instituciones.module';

@Module({
  imports: [PrismaModule, AuthModule, InstitucionesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
