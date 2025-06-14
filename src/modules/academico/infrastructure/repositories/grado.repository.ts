// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\infrastructure\repositories\grado.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma/prisma.service';
import { Grado } from '../../domain/entities';
import { IGradoRepository } from '../../domain/repositories/grado.repository.interface';

@Injectable()
export class GradoRepository implements IGradoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(institucionId: number): Promise<Grado[]> {
    const grados = await this.prisma.grado.findMany({
      where: { institucionId },
      orderBy: { nombre: 'asc' },
    });

    return grados.map(
      (item) =>
        new Grado({
          id: item.id,
          nombre: item.nombre,
          nivelId: item.nivelId,
          anioAcademicoId: item.anioAcademicoId,
          descripcion: item.descripcion || undefined,
          institucionId: item.institucionId,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }),
    );
  }

  async findById(id: number, institucionId: number): Promise<Grado | null> {
    const grado = await this.prisma.grado.findFirst({
      where: {
        id,
        institucionId,
      },
    });

    if (!grado) return null;

    return new Grado({
      id: grado.id,
      nombre: grado.nombre,
      nivelId: grado.nivelId,
      anioAcademicoId: grado.anioAcademicoId,
      descripcion: grado.descripcion || undefined,
      institucionId: grado.institucionId,
      createdAt: grado.createdAt,
      updatedAt: grado.updatedAt,
    });
  }

  async findByNivel(nivelId: number, institucionId: number): Promise<Grado[]> {
    const grados = await this.prisma.grado.findMany({
      where: {
        nivelId,
        institucionId,
      },
      orderBy: { nombre: 'asc' },
    });

    return grados.map(
      (item) =>
        new Grado({
          id: item.id,
          nombre: item.nombre,
          nivelId: item.nivelId,
          anioAcademicoId: item.anioAcademicoId,
          descripcion: item.descripcion || undefined,
          institucionId: item.institucionId,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }),
    );
  }

  async findByAnioAcademico(
    anioAcademicoId: number,
    institucionId: number,
  ): Promise<Grado[]> {
    const grados = await this.prisma.grado.findMany({
      where: {
        anioAcademicoId,
        institucionId,
      },
      orderBy: { nombre: 'asc' },
    });

    return grados.map(
      (item) =>
        new Grado({
          id: item.id,
          nombre: item.nombre,
          nivelId: item.nivelId,
          anioAcademicoId: item.anioAcademicoId,
          descripcion: item.descripcion || undefined,
          institucionId: item.institucionId,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }),
    );
  }

  async create(data: Partial<Grado>): Promise<Grado> {
    const grado = await this.prisma.grado.create({
      data: {
        nombre: data.nombre,
        nivelId: data.nivelId,
        anioAcademicoId: data.anioAcademicoId,
        descripcion: data.descripcion,
        institucionId: data.institucionId,
      },
    });

    return new Grado({
      id: grado.id,
      nombre: grado.nombre,
      nivelId: grado.nivelId,
      anioAcademicoId: grado.anioAcademicoId,
      descripcion: grado.descripcion || undefined,
      institucionId: grado.institucionId,
      createdAt: grado.createdAt,
      updatedAt: grado.updatedAt,
    });
  }

  async update(
    id: number,
    data: Partial<Grado>,
    institucionId: number,
  ): Promise<Grado> {
    const grado = await this.prisma.grado.update({
      where: {
        id,
        institucionId,
      },
      data: {
        nombre: data.nombre,
        nivelId: data.nivelId,
        anioAcademicoId: data.anioAcademicoId,
        descripcion: data.descripcion,
      },
    });

    return new Grado({
      id: grado.id,
      nombre: grado.nombre,
      nivelId: grado.nivelId,
      anioAcademicoId: grado.anioAcademicoId,
      descripcion: grado.descripcion || undefined,
      institucionId: grado.institucionId,
      createdAt: grado.createdAt,
      updatedAt: grado.updatedAt,
    });
  }

  async remove(id: number, institucionId: number): Promise<void> {
    await this.prisma.grado.delete({
      where: {
        id,
        institucionId,
      },
    });
  }
}
