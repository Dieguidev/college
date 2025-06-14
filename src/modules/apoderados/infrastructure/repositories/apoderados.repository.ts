import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma/prisma.service';
import { Apoderado, ApoderadoEstudiante } from '../../domain/entities';
import { IApoderadosRepository } from '../../domain/repositories/apoderados.repository.interface';
import {
  CreateApoderadoDto,
  UpdateApoderadoDto,
  AsignarEstudianteDto,
} from '../../application/dto';

@Injectable()
export class ApoderadosRepository implements IApoderadosRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(institucionId: number): Promise<Apoderado[]> {
    const apoderadosList = await this.prisma.apoderado.findMany({
      where: { institucionId },
    });

    return apoderadosList.map(
      (item) =>
        new Apoderado({
          id: item.id,
          dni: item.dni,
          nombres: item.nombres,
          apellidos: item.apellidos,
          telefono: item.telefono,
          email: item.email || undefined,
          ocupacion: item.ocupacion || undefined,
          direccion: item.direccion || undefined,
          institucionId: item.institucionId,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }),
    );
  }

  async findById(id: number, institucionId: number): Promise<Apoderado | null> {
    const apoderado = await this.prisma.apoderado.findFirst({
      where: {
        id,
        institucionId,
      },
    });

    if (!apoderado) return null;

    return new Apoderado({
      id: apoderado.id,
      dni: apoderado.dni,
      nombres: apoderado.nombres,
      apellidos: apoderado.apellidos,
      telefono: apoderado.telefono,
      email: apoderado.email || undefined,
      ocupacion: apoderado.ocupacion || undefined,
      direccion: apoderado.direccion || undefined,
      institucionId: apoderado.institucionId,
      createdAt: apoderado.createdAt,
      updatedAt: apoderado.updatedAt,
    });
  }

  async findByDni(
    dni: string,
    institucionId: number,
  ): Promise<Apoderado | null> {
    const apoderado = await this.prisma.apoderado.findFirst({
      where: {
        dni,
        institucionId,
      },
    });

    if (!apoderado) return null;

    return new Apoderado({
      id: apoderado.id,
      dni: apoderado.dni,
      nombres: apoderado.nombres,
      apellidos: apoderado.apellidos,
      telefono: apoderado.telefono,
      email: apoderado.email || undefined,
      ocupacion: apoderado.ocupacion || undefined,
      direccion: apoderado.direccion || undefined,
      institucionId: apoderado.institucionId,
      createdAt: apoderado.createdAt,
      updatedAt: apoderado.updatedAt,
    });
  }

  async create(
    createApoderadoDto: CreateApoderadoDto,
    institucionId: number,
  ): Promise<Apoderado> {
    const apoderado = await this.prisma.apoderado.create({
      data: {
        dni: createApoderadoDto.dni,
        nombres: createApoderadoDto.nombres,
        apellidos: createApoderadoDto.apellidos,
        telefono: createApoderadoDto.telefono,
        email: createApoderadoDto.email,
        ocupacion: createApoderadoDto.ocupacion,
        direccion: createApoderadoDto.direccion,
        institucionId,
      },
    });

    return new Apoderado({
      id: apoderado.id,
      dni: apoderado.dni,
      nombres: apoderado.nombres,
      apellidos: apoderado.apellidos,
      telefono: apoderado.telefono,
      email: apoderado.email || undefined,
      ocupacion: apoderado.ocupacion || undefined,
      direccion: apoderado.direccion || undefined,
      institucionId: apoderado.institucionId,
      createdAt: apoderado.createdAt,
      updatedAt: apoderado.updatedAt,
    });
  }

  async update(
    id: number,
    updateApoderadoDto: UpdateApoderadoDto,
    institucionId: number,
  ): Promise<Apoderado> {
    const apoderado = await this.prisma.apoderado.update({
      where: {
        id,
        institucionId,
      },
      data: {
        nombres: updateApoderadoDto.nombres,
        apellidos: updateApoderadoDto.apellidos,
        telefono: updateApoderadoDto.telefono,
        email: updateApoderadoDto.email,
        ocupacion: updateApoderadoDto.ocupacion,
        direccion: updateApoderadoDto.direccion,
      },
    });

    return new Apoderado({
      id: apoderado.id,
      dni: apoderado.dni,
      nombres: apoderado.nombres,
      apellidos: apoderado.apellidos,
      telefono: apoderado.telefono,
      email: apoderado.email || undefined,
      ocupacion: apoderado.ocupacion || undefined,
      direccion: apoderado.direccion || undefined,
      institucionId: apoderado.institucionId,
      createdAt: apoderado.createdAt,
      updatedAt: apoderado.updatedAt,
    });
  }

  async remove(id: number, institucionId: number): Promise<void> {
    await this.prisma.apoderado.delete({
      where: {
        id,
        institucionId,
      },
    });
  }

  async asignarEstudiante(
    asignarEstudianteDto: AsignarEstudianteDto,
  ): Promise<ApoderadoEstudiante> {
    const relacion = await this.prisma.apoderadoEstudiante.create({
      data: {
        apoderadoId: asignarEstudianteDto.apoderadoId,
        estudianteId: asignarEstudianteDto.estudianteId,
        parentesco: asignarEstudianteDto.parentesco,
        esPrincipal: asignarEstudianteDto.esPrincipal || false,
      },
    });

    return new ApoderadoEstudiante({
      id: relacion.id,
      apoderadoId: relacion.apoderadoId,
      estudianteId: relacion.estudianteId,
      parentesco: relacion.parentesco,
      esPrincipal: relacion.esPrincipal,
      createdAt: relacion.createdAt,
      updatedAt: relacion.updatedAt,
    });
  }

  async removerEstudiante(
    apoderadoId: number,
    estudianteId: number,
  ): Promise<void> {
    await this.prisma.apoderadoEstudiante.deleteMany({
      where: {
        apoderadoId,
        estudianteId,
      },
    });
  }

  async getEstudiantesPorApoderado(
    apoderadoId: number,
    institucionId: number,
  ): Promise<any[]> {
    // Obtenemos los estudiantes que tienen relación con este apoderado
    const relaciones = await this.prisma.apoderadoEstudiante.findMany({
      where: {
        apoderadoId,
        apoderado: {
          institucionId,
        },
      },
      include: {
        estudiante: true,
      },
    });

    return relaciones.map((rel) => ({
      relacion: {
        id: rel.id,
        parentesco: rel.parentesco,
        esPrincipal: rel.esPrincipal,
      },
      estudiante: {
        id: rel.estudiante.id,
        dni: rel.estudiante.dni,
        nombres: rel.estudiante.nombres,
        apellidos: rel.estudiante.apellidos,
        nombreCompleto: `${rel.estudiante.nombres} ${rel.estudiante.apellidos}`,
      },
    }));
  }

  async getApoderadosPorEstudiante(
    estudianteId: number,
    institucionId: number,
  ): Promise<any[]> {
    // Obtenemos los apoderados que tienen relación con este estudiante
    const relaciones = await this.prisma.apoderadoEstudiante.findMany({
      where: {
        estudianteId,
        apoderado: {
          institucionId,
        },
      },
      include: {
        apoderado: true,
      },
    });

    return relaciones.map((rel) => ({
      relacion: {
        id: rel.id,
        parentesco: rel.parentesco,
        esPrincipal: rel.esPrincipal,
      },
      apoderado: {
        id: rel.apoderado.id,
        dni: rel.apoderado.dni,
        nombres: rel.apoderado.nombres,
        apellidos: rel.apoderado.apellidos,
        nombreCompleto: `${rel.apoderado.nombres} ${rel.apoderado.apellidos}`,
        telefono: rel.apoderado.telefono,
        email: rel.apoderado.email,
      },
    }));
  }
}
