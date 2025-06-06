-- CreateTable
CREATE TABLE `instituciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `ruc` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `sitioWeb` VARCHAR(191) NULL,
    `logo` VARCHAR(191) NULL,
    `colorPrimario` VARCHAR(191) NULL,
    `colorSecundario` VARCHAR(191) NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `adminId` INTEGER NULL,

    UNIQUE INDEX `instituciones_ruc_key`(`ruc`),
    UNIQUE INDEX `instituciones_adminId_key`(`adminId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estudiantes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dni` VARCHAR(191) NOT NULL,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `fechaNacimiento` DATETIME(3) NOT NULL,
    `genero` ENUM('MASCULINO', 'FEMENINO', 'OTRO') NOT NULL,
    `direccion` VARCHAR(191) NULL,
    `telefono` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `fechaIngreso` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado` ENUM('ACTIVO', 'INACTIVO', 'EGRESADO', 'TRASLADADO', 'SUSPENDIDO') NOT NULL DEFAULT 'ACTIVO',
    `institucionId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `estudiantes_dni_institucionId_key`(`dni`, `institucionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `apoderados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dni` VARCHAR(191) NOT NULL,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `ocupacion` VARCHAR(191) NULL,
    `direccion` VARCHAR(191) NULL,
    `institucionId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `apoderados_dni_institucionId_key`(`dni`, `institucionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `apoderados_estudiantes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `apoderadoId` INTEGER NOT NULL,
    `estudianteId` INTEGER NOT NULL,
    `parentesco` ENUM('PADRE', 'MADRE', 'ABUELO', 'ABUELA', 'TIO', 'TIA', 'HERMANO', 'HERMANA', 'TUTOR_LEGAL', 'OTRO') NOT NULL,
    `esPrincipal` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `apoderados_estudiantes_apoderadoId_estudianteId_key`(`apoderadoId`, `estudianteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `personal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dni` VARCHAR(191) NOT NULL,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `fechaNacimiento` DATETIME(3) NOT NULL,
    `genero` ENUM('MASCULINO', 'FEMENINO', 'OTRO') NOT NULL,
    `direccion` VARCHAR(191) NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `profesion` VARCHAR(191) NULL,
    `fechaContratacion` DATETIME(3) NOT NULL,
    `estado` ENUM('ACTIVO', 'INACTIVO', 'LICENCIA', 'VACACIONES') NOT NULL DEFAULT 'ACTIVO',
    `institucionId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `personal_dni_institucionId_key`(`dni`, `institucionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `personalId` INTEGER NULL,
    `estudianteId` INTEGER NULL,
    `rol` ENUM('SUPER_ADMIN', 'ADMIN', 'DIRECTOR', 'SUBDIRECTOR', 'PROFESOR', 'TUTOR', 'SECRETARIA', 'ESTUDIANTE', 'OTRO') NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `ultimoAcceso` DATETIME(3) NULL,
    `institucionId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `usuarios_personalId_key`(`personalId`),
    UNIQUE INDEX `usuarios_estudianteId_key`(`estudianteId`),
    UNIQUE INDEX `usuarios_username_institucionId_key`(`username`, `institucionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `años_academicos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `fechaInicio` DATETIME(3) NOT NULL,
    `fechaFin` DATETIME(3) NOT NULL,
    `estado` ENUM('PLANIFICACION', 'ACTIVO', 'FINALIZADO') NOT NULL DEFAULT 'PLANIFICACION',
    `institucionId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `años_academicos_nombre_institucionId_key`(`nombre`, `institucionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `niveles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `añoAcademicoId` INTEGER NOT NULL,
    `institucionId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `niveles_nombre_añoAcademicoId_institucionId_key`(`nombre`, `añoAcademicoId`, `institucionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `nivelId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clases` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `capacidad` INTEGER NOT NULL,
    `tutorId` INTEGER NULL,
    `gradoId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `matriculas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estudianteId` INTEGER NOT NULL,
    `claseId` INTEGER NOT NULL,
    `fechaMatricula` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado` ENUM('ACTIVO', 'RETIRADO', 'SUSPENDIDO') NOT NULL DEFAULT 'ACTIVO',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `matriculas_estudianteId_claseId_key`(`estudianteId`, `claseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cursos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `institucionId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `cursos_nombre_institucionId_key`(`nombre`, `institucionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cursos_clases` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cursoId` INTEGER NOT NULL,
    `claseId` INTEGER NOT NULL,
    `profesorId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `cursos_clases_cursoId_claseId_key`(`cursoId`, `claseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profesores_cursos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `profesorId` INTEGER NOT NULL,
    `cursoId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `profesores_cursos_profesorId_cursoId_key`(`profesorId`, `cursoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `periodos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `fechaInicio` DATETIME(3) NOT NULL,
    `fechaFin` DATETIME(3) NOT NULL,
    `añoAcademicoId` INTEGER NOT NULL,
    `institucionId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `periodos_nombre_añoAcademicoId_institucionId_key`(`nombre`, `añoAcademicoId`, `institucionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `horarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cursoClaseId` INTEGER NOT NULL,
    `diaSemana` ENUM('LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO') NOT NULL,
    `horaInicio` DATETIME(3) NOT NULL,
    `horaFin` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asistencias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estudianteId` INTEGER NOT NULL,
    `cursoClaseId` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `estado` ENUM('PRESENTE', 'AUSENTE', 'TARDANZA', 'JUSTIFICADO') NOT NULL,
    `justificacion` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `asistencias_estudianteId_cursoClaseId_fecha_key`(`estudianteId`, `cursoClaseId`, `fecha`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `plantillas_notas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `cursoId` INTEGER NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `institucionId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `plantillas_notas_nombre_institucionId_cursoId_key`(`nombre`, `institucionId`, `cursoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `campos_plantilla_nota` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plantillaId` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `tipoDato` ENUM('NUMERICO', 'ENTERO', 'TEXTO', 'BOOLEANO', 'FECHA', 'SELECCION') NOT NULL,
    `requerido` BOOLEAN NOT NULL DEFAULT false,
    `orden` INTEGER NOT NULL,
    `pesoPromedio` DOUBLE NULL,
    `valorMinimo` DOUBLE NULL,
    `valorMaximo` DOUBLE NULL,
    `valorDefecto` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `campos_plantilla_nota_plantillaId_nombre_key`(`plantillaId`, `nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grupos_notas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plantillaId` INTEGER NOT NULL,
    `cursoClaseId` INTEGER NOT NULL,
    `periodoId` INTEGER NOT NULL,
    `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaEvaluacion` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `grupos_notas_cursoClaseId_periodoId_plantillaId_key`(`cursoClaseId`, `periodoId`, `plantillaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `valores_campo_nota` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `grupoNotaId` INTEGER NOT NULL,
    `campoId` INTEGER NOT NULL,
    `estudianteId` INTEGER NOT NULL,
    `valor` VARCHAR(191) NOT NULL,
    `comentario` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `valores_campo_nota_grupoNotaId_campoId_estudianteId_key`(`grupoNotaId`, `campoId`, `estudianteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipos_notas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `peso` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `obsoleto` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estudianteId` INTEGER NOT NULL,
    `cursoClaseId` INTEGER NOT NULL,
    `tipoNotaId` INTEGER NOT NULL,
    `periodoId` INTEGER NOT NULL,
    `valor` DOUBLE NOT NULL,
    `comentario` VARCHAR(191) NULL,
    `fechaEvaluacion` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `obsoleto` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `notas_estudianteId_cursoClaseId_tipoNotaId_periodoId_key`(`estudianteId`, `cursoClaseId`, `tipoNotaId`, `periodoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `observaciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estudianteId` INTEGER NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tipo` ENUM('CONDUCTUAL', 'ACADEMICA', 'LOGRO', 'OTRO') NOT NULL,
    `institucionId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `plantillas_boletas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `nivelId` INTEGER NOT NULL,
    `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `mostrarAsistencia` BOOLEAN NOT NULL DEFAULT true,
    `mostrarPromedio` BOOLEAN NOT NULL DEFAULT true,
    `mostrarRanking` BOOLEAN NOT NULL DEFAULT true,
    `institucionId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `plantillas_boletas_nombre_nivelId_institucionId_key`(`nombre`, `nivelId`, `institucionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `secciones_boleta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plantillaBoletaId` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `orden` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `boletas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estudianteId` INTEGER NOT NULL,
    `periodoId` INTEGER NOT NULL,
    `plantillaBoletaId` INTEGER NOT NULL,
    `fechaGeneracion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado` ENUM('PENDIENTE', 'GENERADA', 'PUBLICADA', 'ARCHIVADA') NOT NULL DEFAULT 'PENDIENTE',
    `comentarioGeneral` VARCHAR(191) NULL,
    `promedioGeneral` DOUBLE NULL,
    `ranking` INTEGER NULL,
    `publicada` BOOLEAN NOT NULL DEFAULT false,
    `firmadaDirector` BOOLEAN NOT NULL DEFAULT false,
    `firmadaTutor` BOOLEAN NOT NULL DEFAULT false,
    `firmadaApoderado` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `boletas_estudianteId_periodoId_key`(`estudianteId`, `periodoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comentarios_boleta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `boletaId` INTEGER NOT NULL,
    `cursoClaseId` INTEGER NULL,
    `titulo` VARCHAR(191) NULL,
    `comentario` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comentarios_predefinidos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plantillaBoletaId` INTEGER NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `texto` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pensiones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estudianteId` INTEGER NOT NULL,
    `añoAcademicoId` INTEGER NOT NULL,
    `mes` INTEGER NOT NULL,
    `monto` DOUBLE NOT NULL,
    `fechaEmision` DATETIME(3) NOT NULL,
    `fechaVencimiento` DATETIME(3) NOT NULL,
    `fechaPago` DATETIME(3) NULL,
    `estado` ENUM('PENDIENTE', 'PAGADA', 'VENCIDA', 'ANULADA') NOT NULL DEFAULT 'PENDIENTE',
    `metodoPago` ENUM('EFECTIVO', 'TRANSFERENCIA', 'TARJETA', 'DEPOSITO', 'OTRO') NULL,
    `comprobante` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `pensiones_estudianteId_añoAcademicoId_mes_key`(`estudianteId`, `añoAcademicoId`, `mes`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `instituciones` ADD CONSTRAINT `instituciones_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `personal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `estudiantes` ADD CONSTRAINT `estudiantes_institucionId_fkey` FOREIGN KEY (`institucionId`) REFERENCES `instituciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `apoderados` ADD CONSTRAINT `apoderados_institucionId_fkey` FOREIGN KEY (`institucionId`) REFERENCES `instituciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `apoderados_estudiantes` ADD CONSTRAINT `apoderados_estudiantes_apoderadoId_fkey` FOREIGN KEY (`apoderadoId`) REFERENCES `apoderados`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `apoderados_estudiantes` ADD CONSTRAINT `apoderados_estudiantes_estudianteId_fkey` FOREIGN KEY (`estudianteId`) REFERENCES `estudiantes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personal` ADD CONSTRAINT `personal_institucionId_fkey` FOREIGN KEY (`institucionId`) REFERENCES `instituciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_institucionId_fkey` FOREIGN KEY (`institucionId`) REFERENCES `instituciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_personalId_fkey` FOREIGN KEY (`personalId`) REFERENCES `personal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_estudianteId_fkey` FOREIGN KEY (`estudianteId`) REFERENCES `estudiantes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `años_academicos` ADD CONSTRAINT `años_academicos_institucionId_fkey` FOREIGN KEY (`institucionId`) REFERENCES `instituciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `niveles` ADD CONSTRAINT `niveles_institucionId_fkey` FOREIGN KEY (`institucionId`) REFERENCES `instituciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `niveles` ADD CONSTRAINT `niveles_añoAcademicoId_fkey` FOREIGN KEY (`añoAcademicoId`) REFERENCES `años_academicos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grados` ADD CONSTRAINT `grados_nivelId_fkey` FOREIGN KEY (`nivelId`) REFERENCES `niveles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `clases` ADD CONSTRAINT `clases_gradoId_fkey` FOREIGN KEY (`gradoId`) REFERENCES `grados`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `clases` ADD CONSTRAINT `clases_tutorId_fkey` FOREIGN KEY (`tutorId`) REFERENCES `personal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `matriculas` ADD CONSTRAINT `matriculas_estudianteId_fkey` FOREIGN KEY (`estudianteId`) REFERENCES `estudiantes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `matriculas` ADD CONSTRAINT `matriculas_claseId_fkey` FOREIGN KEY (`claseId`) REFERENCES `clases`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cursos` ADD CONSTRAINT `cursos_institucionId_fkey` FOREIGN KEY (`institucionId`) REFERENCES `instituciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cursos_clases` ADD CONSTRAINT `cursos_clases_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `cursos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cursos_clases` ADD CONSTRAINT `cursos_clases_claseId_fkey` FOREIGN KEY (`claseId`) REFERENCES `clases`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cursos_clases` ADD CONSTRAINT `cursos_clases_profesorId_fkey` FOREIGN KEY (`profesorId`) REFERENCES `profesores_cursos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profesores_cursos` ADD CONSTRAINT `profesores_cursos_profesorId_fkey` FOREIGN KEY (`profesorId`) REFERENCES `personal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `periodos` ADD CONSTRAINT `periodos_institucionId_fkey` FOREIGN KEY (`institucionId`) REFERENCES `instituciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `periodos` ADD CONSTRAINT `periodos_añoAcademicoId_fkey` FOREIGN KEY (`añoAcademicoId`) REFERENCES `años_academicos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `horarios` ADD CONSTRAINT `horarios_cursoClaseId_fkey` FOREIGN KEY (`cursoClaseId`) REFERENCES `cursos_clases`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asistencias` ADD CONSTRAINT `asistencias_estudianteId_fkey` FOREIGN KEY (`estudianteId`) REFERENCES `estudiantes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asistencias` ADD CONSTRAINT `asistencias_cursoClaseId_fkey` FOREIGN KEY (`cursoClaseId`) REFERENCES `cursos_clases`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `plantillas_notas` ADD CONSTRAINT `plantillas_notas_institucionId_fkey` FOREIGN KEY (`institucionId`) REFERENCES `instituciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `campos_plantilla_nota` ADD CONSTRAINT `campos_plantilla_nota_plantillaId_fkey` FOREIGN KEY (`plantillaId`) REFERENCES `plantillas_notas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grupos_notas` ADD CONSTRAINT `grupos_notas_plantillaId_fkey` FOREIGN KEY (`plantillaId`) REFERENCES `plantillas_notas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grupos_notas` ADD CONSTRAINT `grupos_notas_cursoClaseId_fkey` FOREIGN KEY (`cursoClaseId`) REFERENCES `cursos_clases`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grupos_notas` ADD CONSTRAINT `grupos_notas_periodoId_fkey` FOREIGN KEY (`periodoId`) REFERENCES `periodos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `valores_campo_nota` ADD CONSTRAINT `valores_campo_nota_grupoNotaId_fkey` FOREIGN KEY (`grupoNotaId`) REFERENCES `grupos_notas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `valores_campo_nota` ADD CONSTRAINT `valores_campo_nota_campoId_fkey` FOREIGN KEY (`campoId`) REFERENCES `campos_plantilla_nota`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `valores_campo_nota` ADD CONSTRAINT `valores_campo_nota_estudianteId_fkey` FOREIGN KEY (`estudianteId`) REFERENCES `estudiantes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notas` ADD CONSTRAINT `notas_estudianteId_fkey` FOREIGN KEY (`estudianteId`) REFERENCES `estudiantes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notas` ADD CONSTRAINT `notas_cursoClaseId_fkey` FOREIGN KEY (`cursoClaseId`) REFERENCES `cursos_clases`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notas` ADD CONSTRAINT `notas_tipoNotaId_fkey` FOREIGN KEY (`tipoNotaId`) REFERENCES `tipos_notas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notas` ADD CONSTRAINT `notas_periodoId_fkey` FOREIGN KEY (`periodoId`) REFERENCES `periodos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `observaciones` ADD CONSTRAINT `observaciones_estudianteId_fkey` FOREIGN KEY (`estudianteId`) REFERENCES `estudiantes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `observaciones` ADD CONSTRAINT `observaciones_institucionId_fkey` FOREIGN KEY (`institucionId`) REFERENCES `instituciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `plantillas_boletas` ADD CONSTRAINT `plantillas_boletas_institucionId_fkey` FOREIGN KEY (`institucionId`) REFERENCES `instituciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `plantillas_boletas` ADD CONSTRAINT `plantillas_boletas_nivelId_fkey` FOREIGN KEY (`nivelId`) REFERENCES `niveles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `secciones_boleta` ADD CONSTRAINT `secciones_boleta_plantillaBoletaId_fkey` FOREIGN KEY (`plantillaBoletaId`) REFERENCES `plantillas_boletas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `boletas` ADD CONSTRAINT `boletas_estudianteId_fkey` FOREIGN KEY (`estudianteId`) REFERENCES `estudiantes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `boletas` ADD CONSTRAINT `boletas_periodoId_fkey` FOREIGN KEY (`periodoId`) REFERENCES `periodos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `boletas` ADD CONSTRAINT `boletas_plantillaBoletaId_fkey` FOREIGN KEY (`plantillaBoletaId`) REFERENCES `plantillas_boletas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comentarios_boleta` ADD CONSTRAINT `comentarios_boleta_boletaId_fkey` FOREIGN KEY (`boletaId`) REFERENCES `boletas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comentarios_boleta` ADD CONSTRAINT `comentarios_boleta_cursoClaseId_fkey` FOREIGN KEY (`cursoClaseId`) REFERENCES `cursos_clases`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comentarios_predefinidos` ADD CONSTRAINT `comentarios_predefinidos_plantillaBoletaId_fkey` FOREIGN KEY (`plantillaBoletaId`) REFERENCES `plantillas_boletas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pensiones` ADD CONSTRAINT `pensiones_estudianteId_fkey` FOREIGN KEY (`estudianteId`) REFERENCES `estudiantes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pensiones` ADD CONSTRAINT `pensiones_añoAcademicoId_fkey` FOREIGN KEY (`añoAcademicoId`) REFERENCES `años_academicos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
