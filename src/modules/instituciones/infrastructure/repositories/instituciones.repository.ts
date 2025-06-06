import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma/prisma.service';
import { Institucion } from '../../domain/entities/institucion.entity';
import { IInstitucionesRepository } from '../../domain/repositories/instituciones.repository.interface';
import { CreateInstitucionDto } from '../../application/dto';
import { Role } from '../../../auth/domain/value-objects/role.value-object';
import { AUTH_REPOSITORY } from '../../../auth/domain/repositories/auth-repository.token';
import { IAuthRepository } from '../../../auth/domain/repositories/auth.repository.interface';
import { CreateStaffDto } from '../../../auth/application/dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class InstitucionesRepository implements IInstitucionesRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
  ) {}

  async findAll(): Promise<Institucion[]> {
    const instituciones = await this.prisma.institucion.findMany();

    return instituciones.map(
      (inst) =>
        new Institucion({
          id: inst.id,
          nombre: inst.nombre,
          ruc: inst.ruc,
          direccion: inst.direccion,
          telefono: inst.telefono || undefined,
          email: inst.email || undefined,
          sitioWeb: inst.sitioWeb || undefined,
          logo: inst.logo || undefined,
          colorPrimario: inst.colorPrimario || undefined,
          colorSecundario: inst.colorSecundario || undefined,
          estado: inst.estado,
          fechaCreacion: inst.fechaCreacion,
          adminId: inst.adminId || undefined,
          createdAt: inst.createdAt,
          updatedAt: inst.updatedAt,
        }),
    );
  }

  async findById(id: number): Promise<Institucion | null> {
    const institucion = await this.prisma.institucion.findUnique({
      where: { id },
    });

    if (!institucion) return null;

    return new Institucion({
      id: institucion.id,
      nombre: institucion.nombre,
      ruc: institucion.ruc,
      direccion: institucion.direccion,
      telefono: institucion.telefono || undefined,
      email: institucion.email || undefined,
      sitioWeb: institucion.sitioWeb || undefined,
      logo: institucion.logo || undefined,
      colorPrimario: institucion.colorPrimario || undefined,
      colorSecundario: institucion.colorSecundario || undefined,
      estado: institucion.estado,
      fechaCreacion: institucion.fechaCreacion,
      adminId: institucion.adminId || undefined,
      createdAt: institucion.createdAt,
      updatedAt: institucion.updatedAt,
    });
  }

  async findByRUC(ruc: string): Promise<Institucion | null> {
    const institucion = await this.prisma.institucion.findUnique({
      where: { ruc },
    });

    if (!institucion) return null;

    return new Institucion({
      id: institucion.id,
      nombre: institucion.nombre,
      ruc: institucion.ruc,
      direccion: institucion.direccion,
      telefono: institucion.telefono || undefined,
      email: institucion.email || undefined,
      sitioWeb: institucion.sitioWeb || undefined,
      logo: institucion.logo || undefined,
      colorPrimario: institucion.colorPrimario || undefined,
      colorSecundario: institucion.colorSecundario || undefined,
      estado: institucion.estado,
      fechaCreacion: institucion.fechaCreacion,
      adminId: institucion.adminId || undefined,
      createdAt: institucion.createdAt,
      updatedAt: institucion.updatedAt,
    });
  }
  async create(
    createInstitucionDto: CreateInstitucionDto,
  ): Promise<Institucion> {
    // Crear la institución y el usuario administrador en una sola transacción
    const result = await this.prisma.$transaction(async (prisma) => {
      // Primero, crear la institución sin el adminId
      const institucion = await prisma.institucion.create({
        data: {
          nombre: createInstitucionDto.nombre,
          ruc: createInstitucionDto.ruc,
          direccion: createInstitucionDto.direccion,
          telefono: createInstitucionDto.telefono,
          email: createInstitucionDto.email,
          sitioWeb: createInstitucionDto.sitioWeb,
          logo: createInstitucionDto.logo,
          colorPrimario: createInstitucionDto.colorPrimario,
          colorSecundario: createInstitucionDto.colorSecundario,
          estado: true,
        },
      });

      console.log('Institución creada:', institucion);

      // Crear el DTO para el usuario administrador
      const staffDto: CreateStaffDto = {
        dni: createInstitucionDto.adminDni,
        nombres: createInstitucionDto.adminNombres,
        apellidos: createInstitucionDto.adminApellidos,
        fechaNacimiento: new Date(), // Por defecto
        genero: 'OTRO', // Por defecto, podría ser un enum
        telefono: createInstitucionDto.adminTelefono,
        email: createInstitucionDto.adminEmail,
        password: createInstitucionDto.adminPassword,
        rol: Role.ADMIN,
        institucionId: institucion.id,
      };

      console.log('Datos del administrador:', staffDto);

      // Utilizar el repositorio de autenticación para crear el usuario administrador
      const user = await this.authRepository.createStaffUser(
        staffDto,
        institucion.id,
      );

      // Actualizar la institución con el adminId
      const updatedInstitucion = await prisma.institucion.update({
        where: { id: institucion.id },
        data: { adminId: user.personalId },
      });

      return {
        institucion: updatedInstitucion,
        user,
      };
    });

    // Devolver la entidad Institucion
    return new Institucion({
      id: result.institucion.id,
      nombre: result.institucion.nombre,
      ruc: result.institucion.ruc,
      direccion: result.institucion.direccion,
      telefono: result.institucion.telefono || undefined,
      email: result.institucion.email || undefined,
      sitioWeb: result.institucion.sitioWeb || undefined,
      logo: result.institucion.logo || undefined,
      colorPrimario: result.institucion.colorPrimario || undefined,
      colorSecundario: result.institucion.colorSecundario || undefined,
      estado: result.institucion.estado,
      fechaCreacion: result.institucion.fechaCreacion,
      adminId: result.institucion.adminId || undefined,
      createdAt: result.institucion.createdAt,
      updatedAt: result.institucion.updatedAt,
    });
  }

  async update(
    id: number,
    updateData: Partial<Institucion>,
  ): Promise<Institucion> {
    const institucion = await this.prisma.institucion.update({
      where: { id },
      data: {
        ...updateData,
      },
    });

    return new Institucion({
      id: institucion.id,
      nombre: institucion.nombre,
      ruc: institucion.ruc,
      direccion: institucion.direccion,
      telefono: institucion.telefono || undefined,
      email: institucion.email || undefined,
      sitioWeb: institucion.sitioWeb || undefined,
      logo: institucion.logo || undefined,
      colorPrimario: institucion.colorPrimario || undefined,
      colorSecundario: institucion.colorSecundario || undefined,
      estado: institucion.estado,
      fechaCreacion: institucion.fechaCreacion,
      adminId: institucion.adminId || undefined,
      createdAt: institucion.createdAt,
      updatedAt: institucion.updatedAt,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.institucion.delete({
      where: { id },
    });
  }
}
