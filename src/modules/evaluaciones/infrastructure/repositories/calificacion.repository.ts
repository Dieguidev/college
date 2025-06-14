// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\evaluaciones\infrastructure\repositories\calificacion.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma/prisma.service';
import { CalificacionRepositoryInterface } from '../../domain/repositories/calificacion.repository.interface';
import { Calificacion } from '../../domain/entities/calificacion.entity';

@Injectable()
export class CalificacionRepository implements CalificacionRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async create(
    calificacion: Partial<Calificacion>,
    institucionId: number,
  ): Promise<Calificacion> {
    const newCalificacion = await this.prisma.calificacion.create({
      data: {
        evaluacionId: calificacion.evaluacionId,
        estudianteId: calificacion.estudianteId,
        puntaje: calificacion.puntaje,
        nota: calificacion.nota,
        observaciones: calificacion.observaciones,
        fechaRegistro: new Date(),
        institucionId,
      },
      include: {
        evaluacion: {
          include: {
            clase: {
              include: {
                curso: true,
              },
            },
            tipoEvaluacion: true,
          },
        },
        estudiante: true,
      },
    });
    return new Calificacion(newCalificacion);
  }

  async createMany(
    calificaciones: Partial<Calificacion>[],
    institucionId: number,
  ): Promise<number> {
    const result = await this.prisma.calificacion.createMany({
      data: calificaciones.map((cal) => ({
        evaluacionId: cal.evaluacionId,
        estudianteId: cal.estudianteId,
        puntaje: cal.puntaje,
        nota: cal.nota,
        observaciones: cal.observaciones,
        fechaRegistro: new Date(),
        institucionId,
      })),
    });
    return result.count;
  }

  async findAll(institucionId: number): Promise<Calificacion[]> {
    const calificaciones = await this.prisma.calificacion.findMany({
      where: {
        institucionId,
        deletedAt: null,
      },
      include: {
        evaluacion: {
          include: {
            clase: {
              include: {
                curso: true,
              },
            },
            tipoEvaluacion: true,
          },
        },
        estudiante: true,
      },
    });
    return calificaciones.map((calificacion) => new Calificacion(calificacion));
  }

  async findById(
    id: number,
    institucionId: number,
  ): Promise<Calificacion | null> {
    const calificacion = await this.prisma.calificacion.findFirst({
      where: {
        id,
        institucionId,
        deletedAt: null,
      },
      include: {
        evaluacion: {
          include: {
            clase: {
              include: {
                curso: true,
              },
            },
            tipoEvaluacion: true,
          },
        },
        estudiante: true,
      },
    });
    return calificacion ? new Calificacion(calificacion) : null;
  }

  async findByEvaluacion(
    evaluacionId: number,
    institucionId: number,
  ): Promise<Calificacion[]> {
    const calificaciones = await this.prisma.calificacion.findMany({
      where: {
        evaluacionId,
        institucionId,
        deletedAt: null,
      },
      include: {
        evaluacion: {
          include: {
            clase: {
              include: {
                curso: true,
              },
            },
            tipoEvaluacion: true,
          },
        },
        estudiante: true,
      },
    });
    return calificaciones.map((calificacion) => new Calificacion(calificacion));
  }

  async findByEstudiante(
    estudianteId: number,
    institucionId: number,
  ): Promise<Calificacion[]> {
    const calificaciones = await this.prisma.calificacion.findMany({
      where: {
        estudianteId,
        institucionId,
        deletedAt: null,
      },
      include: {
        evaluacion: {
          include: {
            clase: {
              include: {
                curso: true,
              },
            },
            tipoEvaluacion: true,
          },
        },
        estudiante: true,
      },
    });
    return calificaciones.map((calificacion) => new Calificacion(calificacion));
  }

  async findByEvaluacionYEstudiante(
    evaluacionId: number,
    estudianteId: number,
    institucionId: number,
  ): Promise<Calificacion | null> {
    const calificacion = await this.prisma.calificacion.findFirst({
      where: {
        evaluacionId,
        estudianteId,
        institucionId,
        deletedAt: null,
      },
      include: {
        evaluacion: {
          include: {
            clase: {
              include: {
                curso: true,
              },
            },
            tipoEvaluacion: true,
          },
        },
        estudiante: true,
      },
    });
    return calificacion ? new Calificacion(calificacion) : null;
  }

  async update(
    id: number,
    calificacion: Partial<Calificacion>,
    institucionId: number,
  ): Promise<Calificacion> {
    const updatedCalificacion = await this.prisma.calificacion.update({
      where: {
        id,
        institucionId,
      },
      data: {
        puntaje: calificacion.puntaje,
        nota: calificacion.nota,
        observaciones: calificacion.observaciones,
      },
      include: {
        evaluacion: {
          include: {
            clase: {
              include: {
                curso: true,
              },
            },
            tipoEvaluacion: true,
          },
        },
        estudiante: true,
      },
    });
    return new Calificacion(updatedCalificacion);
  }

  async updateMany(
    calificaciones: {
      id: number;
      puntaje: number;
      nota: number;
      observaciones?: string;
    }[],
    institucionId: number,
  ): Promise<number> {
    // Prisma no admite updateMany con diferentes datos para cada registro,
    // así que hacemos actualizaciones individuales en una transacción
    let count = 0;
    await this.prisma.$transaction(async (prisma) => {
      for (const cal of calificaciones) {
        await prisma.calificacion.updateMany({
          where: {
            id: cal.id,
            institucionId,
          },
          data: {
            puntaje: cal.puntaje,
            nota: cal.nota,
            observaciones: cal.observaciones,
          },
        });
        count++;
      }
    });
    return count;
  }

  async delete(id: number, institucionId: number): Promise<Calificacion> {
    const deletedCalificacion = await this.prisma.calificacion.update({
      where: {
        id,
        institucionId,
      },
      data: {
        deletedAt: new Date(),
      },
      include: {
        evaluacion: true,
        estudiante: true,
      },
    });
    return new Calificacion(deletedCalificacion);
  }

  async getPromedioByEstudianteYClase(
    estudianteId: number,
    claseId: number,
    institucionId: number,
  ): Promise<number> {
    const result = await this.prisma.calificacion.aggregate({
      where: {
        estudianteId,
        evaluacion: {
          claseId,
        },
        institucionId,
        deletedAt: null,
      },
      _avg: {
        nota: true,
      },
    });

    return result._avg.nota || 0;
  }

  async getPromedioByEstudianteYPeriodo(
    estudianteId: number,
    periodoAcademicoId: number,
    institucionId: number,
  ): Promise<number> {
    const result = await this.prisma.calificacion.aggregate({
      where: {
        estudianteId,
        evaluacion: {
          periodoAcademicoId,
        },
        institucionId,
        deletedAt: null,
      },
      _avg: {
        nota: true,
      },
    });

    return result._avg.nota || 0;
  }
}
