// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\evaluaciones\infrastructure\repositories\evaluacion.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma/prisma.service';
import { EvaluacionRepositoryInterface } from '../../domain/repositories/evaluacion.repository.interface';
import { Evaluacion } from '../../domain/entities/evaluacion.entity';

@Injectable()
export class EvaluacionRepository implements EvaluacionRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async create(
    evaluacion: Partial<Evaluacion>,
    institucionId: number,
  ): Promise<Evaluacion> {
    const newEvaluacion = await this.prisma.evaluacion.create({
      data: {
        titulo: evaluacion.titulo,
        descripcion: evaluacion.descripcion,
        claseId: evaluacion.claseId,
        tipoEvaluacionId: evaluacion.tipoEvaluacionId,
        periodoAcademicoId: evaluacion.periodoAcademicoId,
        fecha: new Date(evaluacion.fecha),
        puntajeMaximo: evaluacion.puntajeMaximo,
        publicada: evaluacion.publicada || false,
        institucionId,
      },
      include: {
        clase: {
          include: {
            curso: true,
            grado: true,
          },
        },
        tipoEvaluacion: true,
        periodoAcademico: true,
      },
    });
    return new Evaluacion(newEvaluacion);
  }

  async findAll(institucionId: number): Promise<Evaluacion[]> {
    const evaluaciones = await this.prisma.evaluacion.findMany({
      where: {
        institucionId,
        deletedAt: null,
      },
      include: {
        clase: {
          include: {
            curso: true,
            grado: true,
            personal: true,
          },
        },
        tipoEvaluacion: true,
        periodoAcademico: true,
      },
      orderBy: {
        fecha: 'desc',
      },
    });
    return evaluaciones.map((evaluacion) => new Evaluacion(evaluacion));
  }

  async findById(
    id: number,
    institucionId: number,
  ): Promise<Evaluacion | null> {
    const evaluacion = await this.prisma.evaluacion.findFirst({
      where: {
        id,
        institucionId,
        deletedAt: null,
      },
      include: {
        clase: {
          include: {
            curso: true,
            grado: true,
            personal: true,
          },
        },
        tipoEvaluacion: true,
        periodoAcademico: true,
      },
    });
    return evaluacion ? new Evaluacion(evaluacion) : null;
  }

  async findByClase(
    claseId: number,
    institucionId: number,
  ): Promise<Evaluacion[]> {
    const evaluaciones = await this.prisma.evaluacion.findMany({
      where: {
        claseId,
        institucionId,
        deletedAt: null,
      },
      include: {
        clase: {
          include: {
            curso: true,
            grado: true,
            personal: true,
          },
        },
        tipoEvaluacion: true,
        periodoAcademico: true,
      },
      orderBy: {
        fecha: 'desc',
      },
    });
    return evaluaciones.map((evaluacion) => new Evaluacion(evaluacion));
  }

  async findByPeriodoAcademico(
    periodoAcademicoId: number,
    institucionId: number,
  ): Promise<Evaluacion[]> {
    const evaluaciones = await this.prisma.evaluacion.findMany({
      where: {
        periodoAcademicoId,
        institucionId,
        deletedAt: null,
      },
      include: {
        clase: {
          include: {
            curso: true,
            grado: true,
            personal: true,
          },
        },
        tipoEvaluacion: true,
        periodoAcademico: true,
      },
      orderBy: {
        fecha: 'desc',
      },
    });
    return evaluaciones.map((evaluacion) => new Evaluacion(evaluacion));
  }

  async findByTipoEvaluacion(
    tipoEvaluacionId: number,
    institucionId: number,
  ): Promise<Evaluacion[]> {
    const evaluaciones = await this.prisma.evaluacion.findMany({
      where: {
        tipoEvaluacionId,
        institucionId,
        deletedAt: null,
      },
      include: {
        clase: {
          include: {
            curso: true,
            grado: true,
            personal: true,
          },
        },
        tipoEvaluacion: true,
        periodoAcademico: true,
      },
      orderBy: {
        fecha: 'desc',
      },
    });
    return evaluaciones.map((evaluacion) => new Evaluacion(evaluacion));
  }

  async findByRangoFechas(
    fechaInicio: Date,
    fechaFin: Date,
    institucionId: number,
  ): Promise<Evaluacion[]> {
    const evaluaciones = await this.prisma.evaluacion.findMany({
      where: {
        fecha: {
          gte: fechaInicio,
          lte: fechaFin,
        },
        institucionId,
        deletedAt: null,
      },
      include: {
        clase: {
          include: {
            curso: true,
            grado: true,
            personal: true,
          },
        },
        tipoEvaluacion: true,
        periodoAcademico: true,
      },
      orderBy: {
        fecha: 'desc',
      },
    });
    return evaluaciones.map((evaluacion) => new Evaluacion(evaluacion));
  }

  async update(
    id: number,
    evaluacion: Partial<Evaluacion>,
    institucionId: number,
  ): Promise<Evaluacion> {
    const updatedEvaluacion = await this.prisma.evaluacion.update({
      where: {
        id,
        institucionId,
      },
      data: {
        titulo: evaluacion.titulo,
        descripcion: evaluacion.descripcion,
        claseId: evaluacion.claseId,
        tipoEvaluacionId: evaluacion.tipoEvaluacionId,
        periodoAcademicoId: evaluacion.periodoAcademicoId,
        fecha: evaluacion.fecha ? new Date(evaluacion.fecha) : undefined,
        puntajeMaximo: evaluacion.puntajeMaximo,
      },
      include: {
        clase: {
          include: {
            curso: true,
            grado: true,
            personal: true,
          },
        },
        tipoEvaluacion: true,
        periodoAcademico: true,
      },
    });
    return new Evaluacion(updatedEvaluacion);
  }

  async delete(id: number, institucionId: number): Promise<Evaluacion> {
    const deletedEvaluacion = await this.prisma.evaluacion.update({
      where: {
        id,
        institucionId,
      },
      data: {
        deletedAt: new Date(),
      },
      include: {
        clase: true,
        tipoEvaluacion: true,
        periodoAcademico: true,
      },
    });
    return new Evaluacion(deletedEvaluacion);
  }

  async publicar(id: number, institucionId: number): Promise<Evaluacion> {
    const evaluacion = await this.prisma.evaluacion.update({
      where: {
        id,
        institucionId,
      },
      data: {
        publicada: true,
      },
      include: {
        clase: {
          include: {
            curso: true,
            grado: true,
          },
        },
        tipoEvaluacion: true,
        periodoAcademico: true,
      },
    });
    return new Evaluacion(evaluacion);
  }

  async despublicar(id: number, institucionId: number): Promise<Evaluacion> {
    const evaluacion = await this.prisma.evaluacion.update({
      where: {
        id,
        institucionId,
      },
      data: {
        publicada: false,
      },
      include: {
        clase: {
          include: {
            curso: true,
            grado: true,
          },
        },
        tipoEvaluacion: true,
        periodoAcademico: true,
      },
    });
    return new Evaluacion(evaluacion);
  }
}
