// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\horarios\infrastructure\repositories\periodo-academico.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma/prisma.service';
import { PeriodoAcademicoRepositoryInterface } from '../../domain/repositories/periodo-academico.repository.interface';
import { PeriodoAcademico } from '../../domain/entities/periodo-academico.entity';

@Injectable()
export class PeriodoAcademicoRepository
  implements PeriodoAcademicoRepositoryInterface
{
  constructor(private prisma: PrismaService) {}
  async create(
    periodoAcademico: Partial<PeriodoAcademico>,
    institucionId: number,
  ): Promise<PeriodoAcademico> {
    const newPeriodoAcademico = await this.prisma.periodo.create({
      data: {
        nombre: periodoAcademico.nombre!,
        fechaInicio: new Date(periodoAcademico.fechaInicio!),
        fechaFin: new Date(periodoAcademico.fechaFin!),
        añoAcademicoId: periodoAcademico.anioAcademicoId!,
        institucionId,
      },
    });
    return new PeriodoAcademico(newPeriodoAcademico);
  }
  async findAll(institucionId: number): Promise<PeriodoAcademico[]> {
    const periodos = await this.prisma.periodo.findMany({
      where: {
        institucionId,
      },
      include: {
        añoAcademico: true,
      },
      orderBy: {
        fechaInicio: 'asc',
      },
    });
    return periodos.map((periodo) => new PeriodoAcademico(periodo));
  }
  async findById(
    id: number,
    institucionId: number,
  ): Promise<PeriodoAcademico | null> {
    const periodo = await this.prisma.periodo.findFirst({
      where: {
        id,
        institucionId,
      },
      include: {
        añoAcademico: true,
      },
    });
    return periodo ? new PeriodoAcademico(periodo) : null;
  }
  async findByAnioAcademico(
    anioAcademicoId: number,
    institucionId: number,
  ): Promise<PeriodoAcademico[]> {
    const periodos = await this.prisma.periodo.findMany({
      where: {
        añoAcademicoId: anioAcademicoId,
        institucionId,
      },
      include: {
        añoAcademico: true,
      },
      orderBy: {
        fechaInicio: 'asc',
      },
    });
    return periodos.map((periodo) => new PeriodoAcademico(periodo));
  }
  async update(
    id: number,
    periodoAcademico: Partial<PeriodoAcademico>,
    institucionId: number,
  ): Promise<PeriodoAcademico> {
    const updatedPeriodoAcademico = await this.prisma.periodo.update({
      where: {
        id,
        institucionId,
      },
      data: {
        nombre: periodoAcademico.nombre,
        fechaInicio: periodoAcademico.fechaInicio
          ? new Date(periodoAcademico.fechaInicio)
          : undefined,
        fechaFin: periodoAcademico.fechaFin
          ? new Date(periodoAcademico.fechaFin)
          : undefined,
        añoAcademicoId: periodoAcademico.anioAcademicoId,
      },
      include: {
        añoAcademico: true,
      },
    });
    return new PeriodoAcademico(updatedPeriodoAcademico);
  }
  async delete(id: number, institucionId: number): Promise<PeriodoAcademico> {
    // Nota: No parece que el modelo Periodo tenga un campo deletedAt en Prisma
    // En su lugar, eliminamos el registro directamente
    const deletedPeriodo = await this.prisma.periodo.delete({
      where: {
        id,
        institucionId,
      },
      include: {
        añoAcademico: true,
      },
    });
    return new PeriodoAcademico(deletedPeriodo);
  }
  async findCurrentPeriodo(
    institucionId: number,
  ): Promise<PeriodoAcademico | null> {
    const today = new Date();

    const currentPeriodo = await this.prisma.periodo.findFirst({
      where: {
        institucionId,
        fechaInicio: {
          lte: today,
        },
        fechaFin: {
          gte: today,
        },
      },
      include: {
        añoAcademico: true,
      },
    });

    return currentPeriodo ? new PeriodoAcademico(currentPeriodo) : null;
  }
}
