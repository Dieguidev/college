// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\infrastructure\repositories\curso.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma/prisma.service';
import { Curso } from '../../domain/entities';
import { ICursoRepository } from '../../domain/repositories/curso.repository.interface';

@Injectable()
export class CursoRepository implements ICursoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(institucionId: number): Promise<Curso[]> {
    const cursos = await this.prisma.curso.findMany({
      where: { institucionId },
      orderBy: { nombre: 'asc' },
    });

    return cursos.map(
      (item) =>
        new Curso({
          id: item.id,
          nombre: item.nombre,
          descripcion: item.descripcion || undefined,
          codigoInterno: item.codigoInterno || undefined,
          institucionId: item.institucionId,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }),
    );
  }

  async findById(id: number, institucionId: number): Promise<Curso | null> {
    const curso = await this.prisma.curso.findFirst({
      where: {
        id,
        institucionId,
      },
    });

    if (!curso) return null;

    return new Curso({
      id: curso.id,
      nombre: curso.nombre,
      descripcion: curso.descripcion || undefined,
      codigoInterno: curso.codigoInterno || undefined,
      institucionId: curso.institucionId,
      createdAt: curso.createdAt,
      updatedAt: curso.updatedAt,
    });
  }

  async create(data: Partial<Curso>): Promise<Curso> {
    const curso = await this.prisma.curso.create({
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
        codigoInterno: data.codigoInterno,
        institucionId: data.institucionId,
      },
    });

    return new Curso({
      id: curso.id,
      nombre: curso.nombre,
      descripcion: curso.descripcion || undefined,
      codigoInterno: curso.codigoInterno || undefined,
      institucionId: curso.institucionId,
      createdAt: curso.createdAt,
      updatedAt: curso.updatedAt,
    });
  }

  async update(
    id: number,
    data: Partial<Curso>,
    institucionId: number,
  ): Promise<Curso> {
    const curso = await this.prisma.curso.update({
      where: {
        id,
        institucionId,
      },
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
        codigoInterno: data.codigoInterno,
      },
    });

    return new Curso({
      id: curso.id,
      nombre: curso.nombre,
      descripcion: curso.descripcion || undefined,
      codigoInterno: curso.codigoInterno || undefined,
      institucionId: curso.institucionId,
      createdAt: curso.createdAt,
      updatedAt: curso.updatedAt,
    });
  }

  async remove(id: number, institucionId: number): Promise<void> {
    await this.prisma.curso.delete({
      where: {
        id,
        institucionId,
      },
    });
  }
}
