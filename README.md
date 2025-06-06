<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://img.shields.io/badge/NestJS-10.x-EA2845?logo=nestjs" alt="NestJS Version" /></a>
  <a href="https://www.prisma.io/" target="blank"><img src="https://img.shields.io/badge/Prisma-5.x-2D3748?logo=prisma" alt="Prisma Version" /></a>
  <a href="https://www.mysql.com/" target="blank"><img src="https://img.shields.io/badge/MySQL-8.0.28-4479A1?logo=mysql&logoColor=white" alt="MySQL Version" /></a>
  <a href="https://www.docker.com/" target="blank"><img src="https://img.shields.io/badge/Docker-Enabled-2496ED?logo=docker&logoColor=white" alt="Docker" /></a>
  <a href="https://nodejs.org/" target="blank"><img src="https://img.shields.io/badge/Node.js-20.x-339933?logo=nodedotjs&logoColor=white" alt="Node.js" /></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
</p>

# Proyecto COLLEGE Backend

Aplicación backend para gestión educativa basada en NestJS, Prisma y MySQL.

## 🚀 Instalación y configuración

### Requisitos previos

- [Node.js](https://nodejs.org/) (v20 o superior)
- [Docker](https://www.docker.com/get-started) y [Docker Compose](https://docs.docker.com/compose/install/)

### Configuración de la base de datos MySQL

Este proyecto utiliza una base de datos MySQL 8.0.28 llamada "colegio" que se configura automáticamente con Docker Compose.

1. Inicia la base de datos MySQL:

```bash
$ docker-compose up -d
```

> **Nota**: Si encuentras problemas al descargar la imagen de MySQL, asegúrate de tener una conexión estable a Internet. La imagen especificada es `mysql:8.0.28`, que es una versión estable.

2. Verifica que el contenedor está en ejecución:

```bash
$ docker ps
```

### Detalles de conexión a la base de datos

- **Host:** localhost
- **Puerto:** 3306
- **Base de datos:** colegio
- **Usuario:** usuario
- **Contraseña:** password
- **URL de conexión:** `mysql://usuario:password@localhost:3306/colegio`

### Configuración del archivo .env

Se ha creado un archivo `.env` en la carpeta `prisma/` con la URL de conexión para Prisma:

```bash
# Ruta: prisma/.env
DATABASE_URL="mysql://usuario:password@localhost:3306/colegio"
```

> **Importante**: En un entorno de producción, asegúrate de no incluir este archivo en tu sistema de control de versiones y usar variables de entorno seguras.

### Configuración de Prisma

Después de iniciar la base de datos:

```bash
# Genera el cliente Prisma
$ npx prisma generate

# Sincroniza el esquema con la base de datos
$ npx prisma db push

# (Opcional) Abre Prisma Studio para gestionar datos
$ npx prisma studio
```

### Instalación de dependencias

```bash
$ npm install
```

## 🚀 Ejecución del proyecto

```bash
# Modo desarrollo
$ npm run start

# Modo desarrollo con recarga automática
$ npm run start:dev

# Modo producción
$ npm run start:prod
```

## 🧪 Ejecución de pruebas

```bash
# Pruebas unitarias
$ npm run test

# Pruebas end-to-end
$ npm run test:e2e

# Cobertura de pruebas
$ npm run test:cov
```

## 🌐 Estructura del proyecto

```
├── prisma/              # Esquemas y migraciones de Prisma
├── src/                 # Código fuente de la aplicación
│   ├── config/          # Configuración de la aplicación y variables de entorno
│   ├── modules/         # Módulos de la aplicación organizados por dominio
│   ├── app.module.ts    # Módulo principal de la aplicación
│   └── main.ts          # Punto de entrada de la aplicación
└── test/                # Pruebas unitarias y de integración
```

## 📊 Modelo de datos (Prisma Schema)

La aplicación utiliza Prisma ORM con MySQL para gestionar un modelo de datos educativo. El esquema se encuentra en `prisma/schema.prisma`.

## 🚀 Despliegue

Para desplegar esta aplicación en producción:

1. Configura variables de entorno seguras para producción
2. Construye la aplicación para producción:

```bash
$ npm run build
```

3. Despliega usando Docker:

```bash
$ docker-compose -f docker-compose.prod.yml up -d
```

También puedes desplegar la aplicación en plataformas como [NestJS Mau](https://mau.nestjs.com) (AWS) o cualquier otro proveedor de servicios en la nube.

## 📌 Notas importantes

- El archivo `.env` contiene credenciales y no debe incluirse en el control de versiones para entornos de producción.
- Para más información sobre configuración de Prisma, consulta la [documentación oficial](https://www.prisma.io/docs/).
- Para entornos de producción, configura contraseñas seguras para la base de datos MySQL.

## 📚 Recursos útiles

<p align="center">
  <a href="https://docs.nestjs.com/" target="_blank">
    <img src="https://img.shields.io/badge/NestJS%20Docs-Read%20More-EA2845?style=for-the-badge&logo=nestjs" alt="NestJS Documentation" />
  </a>
  <a href="https://www.prisma.io/docs/" target="_blank">
    <img src="https://img.shields.io/badge/Prisma%20Docs-Read%20More-2D3748?style=for-the-badge&logo=prisma" alt="Prisma Documentation" />
  </a>
  <a href="https://dev.mysql.com/doc/" target="_blank">
    <img src="https://img.shields.io/badge/MySQL%20Docs-Read%20More-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL Documentation" />
  </a>
</p>

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Docker Documentation](https://docs.docker.com/)

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).
