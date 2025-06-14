-- CreateTable
CREATE TABLE `estudiantes_grados` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `estudianteId` INTEGER NOT NULL,
  `gradoId` INTEGER NOT NULL,
  `seccion` VARCHAR(191) NULL,
  `institucionId` INTEGER NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `estudiantes_grados_estudianteId_idx` ON `estudiantes_grados`(`estudianteId`);

-- CreateIndex
CREATE INDEX `estudiantes_grados_gradoId_idx` ON `estudiantes_grados`(`gradoId`);

-- CreateIndex
CREATE INDEX `estudiantes_grados_institucionId_idx` ON `estudiantes_grados`(`institucionId`);

-- CreateIndex
CREATE UNIQUE INDEX `estudiantes_grados_estudianteId_gradoId_institucionId_key` ON `estudiantes_grados`(`estudianteId`, `gradoId`, `institucionId`);

-- AddForeignKey
ALTER TABLE
  `estudiantes_grados`
ADD
  CONSTRAINT `estudiantes_grados_estudianteId_fkey` FOREIGN KEY (`estudianteId`) REFERENCES `estudiantes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
  `estudiantes_grados`
ADD
  CONSTRAINT `estudiantes_grados_gradoId_fkey` FOREIGN KEY (`gradoId`) REFERENCES `grados`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
  `estudiantes_grados`
ADD
  CONSTRAINT `estudiantes_grados_institucionId_fkey` FOREIGN KEY (`institucionId`) REFERENCES `instituciones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;