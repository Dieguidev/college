// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\infrastructure\repositories\clase.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma/prisma.service';
import { Clase } from '../../domain/entities';
import { IClaseRepository } from '../../domain/repositories/clase.repository.interface';

@Injectable()
export class ClaseRepository implements IClaseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(institucionId: number): Promise<Clase[]> {
    const clases = await this.prisma.clase.findMany({
      where: { institucionId },
    });

    return clases.map(
      (item) =>
        new Clase({
          id: item.id,
          cursoId: item.cursoId,
          gradoId: item.gradoId,
          personalId: item.personalId,
          horasSemanales: item.horasSemanales,
          descripcion: item.descripcion || undefined,
          institucionId: item.institucionId,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }),
    );
  }

  async findById(id: number, institucionId: number): Promise<Clase | null> {
    const clase = await this.prisma.clase.findFirst({
      where: {
        id,
        institucionId,
      },
    });

    if (!clase) return null;

    return new Clase({
      id: clase.id,
      cursoId: clase.cursoId,
      gradoId: clase.gradoId,
      personalId: clase.personalId,
      horasSemanales: clase.horasSemanales,
      descripcion: clase.descripcion || undefined,
      institucionId: clase.institucionId,
      createdAt: clase.createdAt,
      updatedAt: clase.updatedAt,
    });
  }

  async findByGrado(gradoId: number, institucionId: number): Promise<Clase[]> {
    const clases = await this.prisma.clase.findMany({
      where: {
        gradoId,
        institucionId,
      },
    });

    return clases.map(
      (item) =>
        new Clase({
          id: item.id,
          cursoId: item.cursoId,
          gradoId: item.gradoId,
          personalId: item.personalId,
          horasSemanales: item.horasSemanales,
          descripcion: item.descripcion || undefined,
          institucionId: item.institucionId,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }),
    );
  }

  async findByProfesor(
    personalId: number,
    institucionId: number,
  ): Promise<Clase[]> {
    const clases = await this.prisma.clase.findMany({
      where: {
        personalId,
        institucionId,
      },
    });

    return clases.map(
      (item) =>
        new Clase({
          id: item.id,
          cursoId: item.cursoId,
          gradoId: item.gradoId,
          personalId: item.personalId,
          horasSemanales: item.horasSemanales,
          descripcion: item.descripcion || undefined,
          institucionId: item.institucionId,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }),
    );
  }

  async findByCurso(cursoId: number, institucionId: number): Promise<Clase[]> {
    const clases = await this.prisma.clase.findMany({
      where: {
        cursoId,
        institucionId,
      },
    });

    return clases.map(
      (item) =>
        new Clase({
          id: item.id,
          cursoId: item.cursoId,
          gradoId: item.gradoId,
          personalId: item.personalId,
          horasSemanales: item.horasSemanales,
          descripcion: item.descripcion || undefined,
          institucionId: item.institucionId,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }),
    );
  }

  async create(data: Partial<Clase>): Promise<Clase> {
    const clase = await this.prisma.clase.create({
      data: {
        cursoId: data.cursoId,
        gradoId: data.gradoId,
        personalId: data.personalId,
        horasSemanales: data.horasSemanales,
        descripcion: data.descripcion,
        institucionId: data.institucionId,
      },
    });

    return new Clase({
      id: clase.id,
      cursoId: clase.cursoId,
      gradoId: clase.gradoId,
      personalId: clase.personalId,
      horasSemanales: clase.horasSemanales,
      descripcion: clase.descripcion || undefined,
      institucionId: clase.institucionId,
      createdAt: clase.createdAt,
      updatedAt: clase.updatedAt,
    });
  }

  async update(
    id: number,
    data: Partial<Clase>,
    institucionId: number,
  ): Promise<Clase> {
    const clase = await this.prisma.clase.update({
      where: {
        id,
        institucionId,
      },
      data: {
        cursoId: data.cursoId,
        gradoId: data.gradoId,
        personalId: data.personalId,
        horasSemanales: data.horasSemanales,
        descripcion: data.descripcion,
      },
    });

    return new Clase({
      id: clase.id,
      cursoId: clase.cursoId,
      gradoId: clase.gradoId,
      personalId: clase.personalId,
      horasSemanales: clase.horasSemanales,
      descripcion: clase.descripcion || undefined,
      institucionId: clase.institucionId,
      createdAt: clase.createdAt,
      updatedAt: clase.updatedAt,
    });
  }

  async remove(id: number, institucionId: number): Promise<void> {
    await this.prisma.clase.delete({
      where: {
        id,
        institucionId,
      },
    });
  }
}
