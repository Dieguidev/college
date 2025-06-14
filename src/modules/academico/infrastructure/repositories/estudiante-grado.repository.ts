// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\infrastructure\repositories\estudiante-grado.repository.ts
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma/prisma.service';
import { EstudianteGrado } from '../../domain/entities';
import { IEstudianteGradoRepository } from '../../domain/repositories/estudiante-grado.repository.interface';

/**
 * NOTA IMPORTANTE: Este repositorio está simulando operaciones para un modelo "EstudianteGrado"
 * que no existe en la base de datos. En su lugar, usamos el modelo "Matricula" y transformamos
 * los resultados al formato EstudianteGrado. La tabla 'matriculas' conecta estudiantes con clases,
 * y las clases están vinculadas a grados, lo que nos da la relación estudiante-grado.
 */
@Injectable()
export class EstudianteGradoRepository implements IEstudianteGradoRepository {
  private readonly logger = new Logger(EstudianteGradoRepository.name);

  constructor(private readonly prisma: PrismaService) {}
  async findAll(institucionId: number): Promise<EstudianteGrado[]> {
    // Usamos la tabla matriculas como alternativa, haciendo join con clases y grados
    const matriculas = await this.prisma.matricula.findMany({
      where: {
        estudiante: {
          institucionId,
        },
      },
      include: {
        estudiante: true,
        clase: {
          include: {
            grado: true,
          },
        },
      },
    });

    // Transformamos las matrículas en EstudianteGrado
    return matriculas.map(
      (item) =>
        new EstudianteGrado({
          id: item.id,
          estudianteId: item.estudianteId,
          gradoId: item.clase.gradoId,
          seccion: item.clase.nombre,
          institucionId: item.estudiante.institucionId,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }),
    );
  }

  async findById(
    id: number,
    institucionId: number,
  ): Promise<EstudianteGrado | null> {
    const estudianteGrado = await this.prisma.estudianteGrado.findFirst({
      where: {
        id,
        institucionId,
      },
    });

    if (!estudianteGrado) return null;

    return new EstudianteGrado({
      id: estudianteGrado.id,
      estudianteId: estudianteGrado.estudianteId,
      gradoId: estudianteGrado.gradoId,
      seccion: estudianteGrado.seccion || undefined,
      institucionId: estudianteGrado.institucionId,
      createdAt: estudianteGrado.createdAt,
      updatedAt: estudianteGrado.updatedAt,
    });
  }

  async findByEstudiante(
    estudianteId: number,
    institucionId: number,
  ): Promise<EstudianteGrado[]> {
    const estudiantesGrado = await this.prisma.estudianteGrado.findMany({
      where: {
        estudianteId,
        institucionId,
      },
    });

    return estudiantesGrado.map(
      (item) =>
        new EstudianteGrado({
          id: item.id,
          estudianteId: item.estudianteId,
          gradoId: item.gradoId,
          seccion: item.seccion || undefined,
          institucionId: item.institucionId,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }),
    );
  }

  async findByGrado(
    gradoId: number,
    institucionId: number,
  ): Promise<EstudianteGrado[]> {
    const estudiantesGrado = await this.prisma.estudianteGrado.findMany({
      where: {
        gradoId,
        institucionId,
      },
    });

    return estudiantesGrado.map(
      (item) =>
        new EstudianteGrado({
          id: item.id,
          estudianteId: item.estudianteId,
          gradoId: item.gradoId,
          seccion: item.seccion || undefined,
          institucionId: item.institucionId,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }),
    );
  }

  async findEstudiantesEnGrado(
    gradoId: number,
    institucionId: number,
  ): Promise<any[]> {
    const estudiantesGrado = await this.prisma.estudianteGrado.findMany({
      where: {
        gradoId,
        institucionId,
      },
      include: {
        estudiante: true,
      },
      orderBy: {
        estudiante: {
          apellidos: 'asc',
        },
      },
    });

    return estudiantesGrado.map((item) => ({
      id: item.id,
      seccion: item.seccion,
      estudiante: {
        id: item.estudiante.id,
        dni: item.estudiante.dni,
        nombres: item.estudiante.nombres,
        apellidos: item.estudiante.apellidos,
        nombreCompleto: `${item.estudiante.nombres} ${item.estudiante.apellidos}`,
      },
    }));
  }

  async create(data: Partial<EstudianteGrado>): Promise<EstudianteGrado> {
    const estudianteGrado = await this.prisma.estudianteGrado.create({
      data: {
        estudianteId: data.estudianteId,
        gradoId: data.gradoId,
        seccion: data.seccion,
        institucionId: data.institucionId,
      },
    });

    return new EstudianteGrado({
      id: estudianteGrado.id,
      estudianteId: estudianteGrado.estudianteId,
      gradoId: estudianteGrado.gradoId,
      seccion: estudianteGrado.seccion || undefined,
      institucionId: estudianteGrado.institucionId,
      createdAt: estudianteGrado.createdAt,
      updatedAt: estudianteGrado.updatedAt,
    });
  }

  async update(
    id: number,
    data: Partial<EstudianteGrado>,
    institucionId: number,
  ): Promise<EstudianteGrado> {
    const estudianteGrado = await this.prisma.estudianteGrado.update({
      where: {
        id,
        institucionId,
      },
      data: {
        estudianteId: data.estudianteId,
        gradoId: data.gradoId,
        seccion: data.seccion,
      },
    });

    return new EstudianteGrado({
      id: estudianteGrado.id,
      estudianteId: estudianteGrado.estudianteId,
      gradoId: estudianteGrado.gradoId,
      seccion: estudianteGrado.seccion || undefined,
      institucionId: estudianteGrado.institucionId,
      createdAt: estudianteGrado.createdAt,
      updatedAt: estudianteGrado.updatedAt,
    });
  }

  async remove(id: number, institucionId: number): Promise<void> {
    await this.prisma.estudianteGrado.delete({
      where: {
        id,
        institucionId,
      },
    });
  }

  async matricularEstudiante(
    estudianteId: number,
    gradoId: number,
    seccion: string,
    institucionId: number,
  ): Promise<EstudianteGrado> {
    const estudianteGrado = await this.prisma.estudianteGrado.create({
      data: {
        estudianteId,
        gradoId,
        seccion,
        institucionId,
      },
    });

    return new EstudianteGrado({
      id: estudianteGrado.id,
      estudianteId: estudianteGrado.estudianteId,
      gradoId: estudianteGrado.gradoId,
      seccion: estudianteGrado.seccion || undefined,
      institucionId: estudianteGrado.institucionId,
      createdAt: estudianteGrado.createdAt,
      updatedAt: estudianteGrado.updatedAt,
    });
  }

  async desmatricularEstudiante(
    estudianteId: number,
    gradoId: number,
    institucionId: number,
  ): Promise<void> {
    await this.prisma.estudianteGrado.deleteMany({
      where: {
        estudianteId,
        gradoId,
        institucionId,
      },
    });
  }
}
