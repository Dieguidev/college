// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\infrastructure\repositories\nivel.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma/prisma.service';
import { Nivel } from '../../domain/entities';
import { INivelRepository } from '../../domain/repositories/nivel.repository.interface';

@Injectable()
export class NivelRepository implements INivelRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(institucionId: number): Promise<Nivel[]> {
    const niveles = await this.prisma.nivel.findMany({
      where: { institucionId },
      orderBy: { nombre: 'asc' },
    });

    return niveles.map(
      (item) =>
        new Nivel({
          id: item.id,
          nombre: item.nombre,
          descripcion: item.descripcion || undefined,
          institucionId: item.institucionId,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }),
    );
  }

  async findById(id: number, institucionId: number): Promise<Nivel | null> {
    const nivel = await this.prisma.nivel.findFirst({
      where: {
        id,
        institucionId,
      },
    });

    if (!nivel) return null;

    return new Nivel({
      id: nivel.id,
      nombre: nivel.nombre,
      descripcion: nivel.descripcion || undefined,
      institucionId: nivel.institucionId,
      createdAt: nivel.createdAt,
      updatedAt: nivel.updatedAt,
    });
  }

  async create(data: Partial<Nivel>): Promise<Nivel> {
    const nivel = await this.prisma.nivel.create({
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
        institucionId: data.institucionId,
      },
    });

    return new Nivel({
      id: nivel.id,
      nombre: nivel.nombre,
      descripcion: nivel.descripcion || undefined,
      institucionId: nivel.institucionId,
      createdAt: nivel.createdAt,
      updatedAt: nivel.updatedAt,
    });
  }

  async update(
    id: number,
    data: Partial<Nivel>,
    institucionId: number,
  ): Promise<Nivel> {
    const nivel = await this.prisma.nivel.update({
      where: {
        id,
        institucionId,
      },
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
      },
    });

    return new Nivel({
      id: nivel.id,
      nombre: nivel.nombre,
      descripcion: nivel.descripcion || undefined,
      institucionId: nivel.institucionId,
      createdAt: nivel.createdAt,
      updatedAt: nivel.updatedAt,
    });
  }

  async remove(id: number, institucionId: number): Promise<void> {
    await this.prisma.nivel.delete({
      where: {
        id,
        institucionId,
      },
    });
  }
}
