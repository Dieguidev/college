// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\infrastructure\repositories\anio-academico.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma/prisma.service';
import { AnioAcademico } from '../../domain/entities';
import { IAnioAcademicoRepository } from '../../domain/repositories/anio-academico.repository.interface';

@Injectable()
export class AnioAcademicoRepository implements IAnioAcademicoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(institucionId: number): Promise<AnioAcademico[]> {
    const aniosAcademicos = await this.prisma.anioAcademico.findMany({
      where: { institucionId },
      orderBy: { fechaInicio: 'desc' },
    });

    return aniosAcademicos.map(
      (item) =>
        new AnioAcademico({
          id: item.id,
          nombre: item.nombre,
          fechaInicio: item.fechaInicio,
          fechaFin: item.fechaFin,
          activo: item.activo,
          institucionId: item.institucionId,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }),
    );
  }

  async findById(
    id: number,
    institucionId: number,
  ): Promise<AnioAcademico | null> {
    const anioAcademico = await this.prisma.anioAcademico.findFirst({
      where: {
        id,
        institucionId,
      },
    });

    if (!anioAcademico) return null;

    return new AnioAcademico({
      id: anioAcademico.id,
      nombre: anioAcademico.nombre,
      fechaInicio: anioAcademico.fechaInicio,
      fechaFin: anioAcademico.fechaFin,
      activo: anioAcademico.activo,
      institucionId: anioAcademico.institucionId,
      createdAt: anioAcademico.createdAt,
      updatedAt: anioAcademico.updatedAt,
    });
  }

  async findActiveYear(institucionId: number): Promise<AnioAcademico | null> {
    const anioActivo = await this.prisma.anioAcademico.findFirst({
      where: {
        institucionId,
        activo: true,
      },
    });

    if (!anioActivo) return null;

    return new AnioAcademico({
      id: anioActivo.id,
      nombre: anioActivo.nombre,
      fechaInicio: anioActivo.fechaInicio,
      fechaFin: anioActivo.fechaFin,
      activo: anioActivo.activo,
      institucionId: anioActivo.institucionId,
      createdAt: anioActivo.createdAt,
      updatedAt: anioActivo.updatedAt,
    });
  }

  async create(data: Partial<AnioAcademico>): Promise<AnioAcademico> {
    const anioAcademico = await this.prisma.anioAcademico.create({
      data: {
        nombre: data.nombre,
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin,
        activo: data.activo || false,
        institucionId: data.institucionId,
      },
    });

    return new AnioAcademico({
      id: anioAcademico.id,
      nombre: anioAcademico.nombre,
      fechaInicio: anioAcademico.fechaInicio,
      fechaFin: anioAcademico.fechaFin,
      activo: anioAcademico.activo,
      institucionId: anioAcademico.institucionId,
      createdAt: anioAcademico.createdAt,
      updatedAt: anioAcademico.updatedAt,
    });
  }

  async update(
    id: number,
    data: Partial<AnioAcademico>,
    institucionId: number,
  ): Promise<AnioAcademico> {
    const anioAcademico = await this.prisma.anioAcademico.update({
      where: {
        id,
        institucionId,
      },
      data: {
        nombre: data.nombre,
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin,
        activo: data.activo,
      },
    });

    return new AnioAcademico({
      id: anioAcademico.id,
      nombre: anioAcademico.nombre,
      fechaInicio: anioAcademico.fechaInicio,
      fechaFin: anioAcademico.fechaFin,
      activo: anioAcademico.activo,
      institucionId: anioAcademico.institucionId,
      createdAt: anioAcademico.createdAt,
      updatedAt: anioAcademico.updatedAt,
    });
  }

  async remove(id: number, institucionId: number): Promise<void> {
    await this.prisma.anioAcademico.delete({
      where: {
        id,
        institucionId,
      },
    });
  }

  async activateYear(
    id: number,
    institucionId: number,
  ): Promise<AnioAcademico> {
    // Primero desactivamos todos los años académicos de la institución
    await this.prisma.anioAcademico.updateMany({
      where: {
        institucionId,
        activo: true,
      },
      data: {
        activo: false,
      },
    });

    // Luego activamos el año académico solicitado
    const anioAcademico = await this.prisma.anioAcademico.update({
      where: {
        id,
        institucionId,
      },
      data: {
        activo: true,
      },
    });

    return new AnioAcademico({
      id: anioAcademico.id,
      nombre: anioAcademico.nombre,
      fechaInicio: anioAcademico.fechaInicio,
      fechaFin: anioAcademico.fechaFin,
      activo: anioAcademico.activo,
      institucionId: anioAcademico.institucionId,
      createdAt: anioAcademico.createdAt,
      updatedAt: anioAcademico.updatedAt,
    });
  }
}
