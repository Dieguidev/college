import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma/prisma.service';
import { Estudiante } from '../../domain/entities/estudiante.entity';
import { IEstudiantesRepository } from '../../domain/repositories/estudiantes.repository.interface';
import {
  CreateEstudianteDto,
  UpdateEstudianteDto,
} from '../../application/dto';
import { EstadoEstudiante } from '@prisma/client';

@Injectable()
export class EstudiantesRepository implements IEstudiantesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(institucionId: number): Promise<Estudiante[]> {
    const estudiantesList = await this.prisma.estudiante.findMany({
      where: { institucionId },
    });

    return estudiantesList.map(
      (item) =>
        new Estudiante({
          id: item.id,
          dni: item.dni,
          nombres: item.nombres,
          apellidos: item.apellidos,
          fechaNacimiento: item.fechaNacimiento,
          genero: item.genero,
          direccion: item.direccion || undefined,
          telefono: item.telefono || undefined,
          email: item.email || undefined,
          fechaIngreso: item.fechaIngreso,
          estado: item.estado,
          institucionId: item.institucionId,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }),
    );
  }

  async findById(
    id: number,
    institucionId: number,
  ): Promise<Estudiante | null> {
    const estudiante = await this.prisma.estudiante.findFirst({
      where: {
        id,
        institucionId,
      },
    });

    if (!estudiante) return null;

    return new Estudiante({
      id: estudiante.id,
      dni: estudiante.dni,
      nombres: estudiante.nombres,
      apellidos: estudiante.apellidos,
      fechaNacimiento: estudiante.fechaNacimiento,
      genero: estudiante.genero,
      direccion: estudiante.direccion || undefined,
      telefono: estudiante.telefono || undefined,
      email: estudiante.email || undefined,
      fechaIngreso: estudiante.fechaIngreso,
      estado: estudiante.estado,
      institucionId: estudiante.institucionId,
      createdAt: estudiante.createdAt,
      updatedAt: estudiante.updatedAt,
    });
  }

  async findByDni(
    dni: string,
    institucionId: number,
  ): Promise<Estudiante | null> {
    const estudiante = await this.prisma.estudiante.findFirst({
      where: {
        dni,
        institucionId,
      },
    });

    if (!estudiante) return null;

    return new Estudiante({
      id: estudiante.id,
      dni: estudiante.dni,
      nombres: estudiante.nombres,
      apellidos: estudiante.apellidos,
      fechaNacimiento: estudiante.fechaNacimiento,
      genero: estudiante.genero,
      direccion: estudiante.direccion || undefined,
      telefono: estudiante.telefono || undefined,
      email: estudiante.email || undefined,
      fechaIngreso: estudiante.fechaIngreso,
      estado: estudiante.estado,
      institucionId: estudiante.institucionId,
      createdAt: estudiante.createdAt,
      updatedAt: estudiante.updatedAt,
    });
  }

  async create(
    createEstudianteDto: CreateEstudianteDto,
    institucionId: number,
  ): Promise<Estudiante> {
    const estudiante = await this.prisma.estudiante.create({
      data: {
        dni: createEstudianteDto.dni,
        nombres: createEstudianteDto.nombres,
        apellidos: createEstudianteDto.apellidos,
        fechaNacimiento: createEstudianteDto.fechaNacimiento,
        genero: createEstudianteDto.genero,
        direccion: createEstudianteDto.direccion,
        telefono: createEstudianteDto.telefono,
        email: createEstudianteDto.email,
        fechaIngreso: new Date(),
        estado: EstadoEstudiante.ACTIVO,
        institucionId,
      },
    });

    return new Estudiante({
      id: estudiante.id,
      dni: estudiante.dni,
      nombres: estudiante.nombres,
      apellidos: estudiante.apellidos,
      fechaNacimiento: estudiante.fechaNacimiento,
      genero: estudiante.genero,
      direccion: estudiante.direccion || undefined,
      telefono: estudiante.telefono || undefined,
      email: estudiante.email || undefined,
      fechaIngreso: estudiante.fechaIngreso,
      estado: estudiante.estado,
      institucionId: estudiante.institucionId,
      createdAt: estudiante.createdAt,
      updatedAt: estudiante.updatedAt,
    });
  }

  async update(
    id: number,
    updateEstudianteDto: UpdateEstudianteDto,
    institucionId: number,
  ): Promise<Estudiante> {
    const estudiante = await this.prisma.estudiante.update({
      where: {
        id,
        institucionId,
      },
      data: {
        nombres: updateEstudianteDto.nombres,
        apellidos: updateEstudianteDto.apellidos,
        fechaNacimiento: updateEstudianteDto.fechaNacimiento,
        genero: updateEstudianteDto.genero,
        direccion: updateEstudianteDto.direccion,
        telefono: updateEstudianteDto.telefono,
        email: updateEstudianteDto.email,
        estado: updateEstudianteDto.estado,
      },
    });

    return new Estudiante({
      id: estudiante.id,
      dni: estudiante.dni,
      nombres: estudiante.nombres,
      apellidos: estudiante.apellidos,
      fechaNacimiento: estudiante.fechaNacimiento,
      genero: estudiante.genero,
      direccion: estudiante.direccion || undefined,
      telefono: estudiante.telefono || undefined,
      email: estudiante.email || undefined,
      fechaIngreso: estudiante.fechaIngreso,
      estado: estudiante.estado,
      institucionId: estudiante.institucionId,
      createdAt: estudiante.createdAt,
      updatedAt: estudiante.updatedAt,
    });
  }

  async remove(id: number, institucionId: number): Promise<void> {
    await this.prisma.estudiante.delete({
      where: {
        id,
        institucionId,
      },
    });
  }
}
