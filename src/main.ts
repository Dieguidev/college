import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import * as morgan from 'morgan';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import { SecurityHeadersInterceptor } from './common/interceptors/security-headers.interceptor';
import { envs } from './config/envs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');

  // Middleware de seguridad
  app.use(helmet()); // Agrega cabeceras HTTP seguras
  app.use(cookieParser()); // Necesario para csurf

  // Configuración CORS
  app.enableCors({
    origin: envs.corsOrigin || '*', // En producción, limitar a dominios específicos
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: true,
    }),
  );

  // Registrar interceptor de cabeceras de seguridad globalmente
  app.useGlobalInterceptors(new SecurityHeadersInterceptor());

  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads' });
  app.use(morgan('combined'));

  // CSRF protection - excluyendo API para permitir uso con frontends independientes
  // Solo habilitar si tu aplicación usa cookies para autenticación
  if (process.env.ENABLE_CSRF === 'true') {
    app.use(
      csurf({
        cookie: {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        },
        // Excluir rutas de API y Swagger
        ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
        // Función para determinar qué rutas están exentas de CSRF
        ignorePath: (req) => {
          return req.path.includes('/api/');
        },
      }),
    );

    // Middleware para manejar errores CSRF
    app.use((err, req, res, next) => {
      if (err.code === 'EBADCSRFTOKEN') {
        res.status(403).json({
          statusCode: 403,
          message: 'CSRF token invalid',
        });
      } else {
        next(err);
      }
    });
  }

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('College API')
    .setDescription('API para gestión de instituciones educativas')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .addTag('instituciones', 'Gestión de instituciones educativas')
    .addTag('auth', 'Autenticación y autorización')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(envs.port || 3000);
}
bootstrap();
