// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\horarios\infrastructure\repositories\horario.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma/prisma.service';
import { HorarioRepositoryInterface } from '../../domain/repositories/horario.repository.interface';
import { Horario, DiaSemana } from '../../domain/entities/horario.entity';

@Injectable()
export class HorarioRepository implements HorarioRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async create(
    horario: Partial<Horario>,
    institucionId: number,
  ): Promise<Horario> {
    const newHorario = await this.prisma.horario.create({
      data: {
        claseId: horario.claseId,
        diaSemana: horario.diaSemana,
        horaInicio: horario.horaInicio,
        horaFin: horario.horaFin,
        institucionId,
      },
    });
    return new Horario(newHorario);
  }

  async findAll(institucionId: number): Promise<Horario[]> {
    const horarios = await this.prisma.horario.findMany({
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
      },
    });
    return horarios.map((horario) => new Horario(horario));
  }

  async findById(id: number, institucionId: number): Promise<Horario | null> {
    const horario = await this.prisma.horario.findFirst({
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
      },
    });
    return horario ? new Horario(horario) : null;
  }

  async findByClase(
    claseId: number,
    institucionId: number,
  ): Promise<Horario[]> {
    const horarios = await this.prisma.horario.findMany({
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
      },
    });
    return horarios.map((horario) => new Horario(horario));
  }

  async findByDiaSemana(
    diaSemana: DiaSemana,
    institucionId: number,
  ): Promise<Horario[]> {
    const horarios = await this.prisma.horario.findMany({
      where: {
        diaSemana,
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
      },
    });
    return horarios.map((horario) => new Horario(horario));
  }

  async update(
    id: number,
    horario: Partial<Horario>,
    institucionId: number,
  ): Promise<Horario> {
    const updatedHorario = await this.prisma.horario.update({
      where: {
        id,
        institucionId,
      },
      data: {
        claseId: horario.claseId,
        diaSemana: horario.diaSemana,
        horaInicio: horario.horaInicio,
        horaFin: horario.horaFin,
      },
      include: {
        clase: {
          include: {
            curso: true,
            grado: true,
            personal: true,
          },
        },
      },
    });
    return new Horario(updatedHorario);
  }

  async delete(id: number, institucionId: number): Promise<Horario> {
    const deletedHorario = await this.prisma.horario.update({
      where: {
        id,
        institucionId,
      },
      data: {
        deletedAt: new Date(),
      },
      include: {
        clase: true,
      },
    });
    return new Horario(deletedHorario);
  }

  async findHorariosByGrado(
    gradoId: number,
    institucionId: number,
  ): Promise<Horario[]> {
    const horarios = await this.prisma.horario.findMany({
      where: {
        clase: {
          gradoId,
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
      },
    });
    return horarios.map((horario) => new Horario(horario));
  }

  async findHorariosByProfesor(
    profesorId: number,
    institucionId: number,
  ): Promise<Horario[]> {
    const horarios = await this.prisma.horario.findMany({
      where: {
        clase: {
          personalId: profesorId,
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
      },
    });
    return horarios.map((horario) => new Horario(horario));
  }
}
