import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma/prisma.service';
import { Personal } from '../../domain/entities/personal.entity';
import { IPersonalRepository } from '../../domain/repositories/personal.repository.interface';
import { CreatePersonalDto, UpdatePersonalDto } from '../../application/dto';
import { EstadoPersonal } from '@prisma/client';

@Injectable()
export class PersonalRepository implements IPersonalRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(institucionId: number): Promise<Personal[]> {
    const personalList = await this.prisma.personal.findMany({
      where: { institucionId },
    });

    return personalList.map(
      (item) =>
        new Personal({
          id: item.id,
          dni: item.dni,
          nombres: item.nombres,
          apellidos: item.apellidos,
          fechaNacimiento: item.fechaNacimiento,
          genero: item.genero,
          direccion: item.direccion || undefined,
          telefono: item.telefono,
          email: item.email,
          profesion: item.profesion || undefined,
          fechaContratacion: item.fechaContratacion,
          estado: item.estado,
          institucionId: item.institucionId,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }),
    );
  }

  async findById(id: number, institucionId: number): Promise<Personal | null> {
    const personal = await this.prisma.personal.findFirst({
      where: {
        id,
        institucionId,
      },
    });

    if (!personal) return null;

    return new Personal({
      id: personal.id,
      dni: personal.dni,
      nombres: personal.nombres,
      apellidos: personal.apellidos,
      fechaNacimiento: personal.fechaNacimiento,
      genero: personal.genero,
      direccion: personal.direccion || undefined,
      telefono: personal.telefono,
      email: personal.email,
      profesion: personal.profesion || undefined,
      fechaContratacion: personal.fechaContratacion,
      estado: personal.estado,
      institucionId: personal.institucionId,
      createdAt: personal.createdAt,
      updatedAt: personal.updatedAt,
    });
  }

  async findByDni(
    dni: string,
    institucionId: number,
  ): Promise<Personal | null> {
    const personal = await this.prisma.personal.findFirst({
      where: {
        dni,
        institucionId,
      },
    });

    if (!personal) return null;

    return new Personal({
      id: personal.id,
      dni: personal.dni,
      nombres: personal.nombres,
      apellidos: personal.apellidos,
      fechaNacimiento: personal.fechaNacimiento,
      genero: personal.genero,
      direccion: personal.direccion || undefined,
      telefono: personal.telefono,
      email: personal.email,
      profesion: personal.profesion || undefined,
      fechaContratacion: personal.fechaContratacion,
      estado: personal.estado,
      institucionId: personal.institucionId,
      createdAt: personal.createdAt,
      updatedAt: personal.updatedAt,
    });
  }

  async create(
    createPersonalDto: CreatePersonalDto,
    institucionId: number,
  ): Promise<Personal> {
    const personal = await this.prisma.personal.create({
      data: {
        dni: createPersonalDto.dni,
        nombres: createPersonalDto.nombres,
        apellidos: createPersonalDto.apellidos,
        fechaNacimiento: createPersonalDto.fechaNacimiento,
        genero: createPersonalDto.genero,
        direccion: createPersonalDto.direccion,
        telefono: createPersonalDto.telefono,
        email: createPersonalDto.email,
        profesion: createPersonalDto.profesion,
        fechaContratacion: createPersonalDto.fechaContratacion || new Date(),
        estado: EstadoPersonal.ACTIVO,
        institucionId,
      },
    });

    return new Personal({
      id: personal.id,
      dni: personal.dni,
      nombres: personal.nombres,
      apellidos: personal.apellidos,
      fechaNacimiento: personal.fechaNacimiento,
      genero: personal.genero,
      direccion: personal.direccion || undefined,
      telefono: personal.telefono,
      email: personal.email,
      profesion: personal.profesion || undefined,
      fechaContratacion: personal.fechaContratacion,
      estado: personal.estado,
      institucionId: personal.institucionId,
      createdAt: personal.createdAt,
      updatedAt: personal.updatedAt,
    });
  }

  async update(
    id: number,
    updatePersonalDto: UpdatePersonalDto,
    institucionId: number,
  ): Promise<Personal> {
    const personal = await this.prisma.personal.update({
      where: {
        id,
        institucionId,
      },
      data: {
        nombres: updatePersonalDto.nombres,
        apellidos: updatePersonalDto.apellidos,
        fechaNacimiento: updatePersonalDto.fechaNacimiento,
        genero: updatePersonalDto.genero,
        direccion: updatePersonalDto.direccion,
        telefono: updatePersonalDto.telefono,
        email: updatePersonalDto.email,
        profesion: updatePersonalDto.profesion,
        fechaContratacion: updatePersonalDto.fechaContratacion,
        estado: updatePersonalDto.estado,
      },
    });

    return new Personal({
      id: personal.id,
      dni: personal.dni,
      nombres: personal.nombres,
      apellidos: personal.apellidos,
      fechaNacimiento: personal.fechaNacimiento,
      genero: personal.genero,
      direccion: personal.direccion || undefined,
      telefono: personal.telefono,
      email: personal.email,
      profesion: personal.profesion || undefined,
      fechaContratacion: personal.fechaContratacion,
      estado: personal.estado,
      institucionId: personal.institucionId,
      createdAt: personal.createdAt,
      updatedAt: personal.updatedAt,
    });
  }

  async remove(id: number, institucionId: number): Promise<void> {
    await this.prisma.personal.delete({
      where: {
        id,
        institucionId,
      },
    });
  }
}
