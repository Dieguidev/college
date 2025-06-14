import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma/prisma.service';
import { Institucion } from '../../domain/entities/institucion.entity';
import { IInstitucionRepository } from '../../domain/repositories/institucion.repository.interface';

@Injectable()
export class InstitucionRepository implements IInstitucionRepository {
  private readonly logger = new Logger(InstitucionRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Institucion[]> {
    try {
      const instituciones = await this.prisma.institucion.findMany({
        orderBy: { nombre: 'asc' },
      });

      return instituciones.map(
        (item) =>
          new Institucion({
            id: item.id,
            nombre: item.nombre,
            ruc: item.ruc,
            direccion: item.direccion,
            telefono: item.telefono || undefined,
            email: item.email || undefined,
            sitioWeb: item.sitioWeb || undefined,
            logo: item.logo || undefined,
            colorPrimario: item.colorPrimario || undefined,
            colorSecundario: item.colorSecundario || undefined,
            estado: item.estado,
            fechaCreacion: item.fechaCreacion,
            adminId: item.adminId || undefined,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          }),
      );
    } catch (error) {
      this.logger.error(
        `Error al buscar todas las instituciones: ${error.message}`,
      );
      throw error;
    }
  }
  async findById(id: number): Promise<Institucion | null> {
    try {
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
    } catch (error) {
      this.logger.error(
        `Error al buscar la institución con id ${id}: ${error.message}`,
      );
      throw error;
    }
  }

  async findByRuc(ruc: string): Promise<Institucion | null> {
    try {
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
    } catch (error) {
      this.logger.error(
        `Error al buscar la institución con RUC ${ruc}: ${error.message}`,
      );
      throw error;
    }
  }
  async create(data: Partial<Institucion>): Promise<Institucion> {
    try {
      if (!data.nombre || !data.ruc || !data.direccion) {
        throw new Error('Nombre, RUC y dirección son requeridos');
      }

      const institucion = await this.prisma.institucion.create({
        data: {
          nombre: data.nombre,
          ruc: data.ruc,
          direccion: data.direccion,
          telefono: data.telefono || null,
          email: data.email || null,
          sitioWeb: data.sitioWeb || null,
          logo: data.logo || null,
          colorPrimario: data.colorPrimario || null,
          colorSecundario: data.colorSecundario || null,
          estado: data.estado ?? true,
          adminId: data.adminId || null,
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
    } catch (error) {
      this.logger.error(`Error al crear la institución: ${error.message}`);
      throw error;
    }
  }
  async update(id: number, data: Partial<Institucion>): Promise<Institucion> {
    try {
      // Verificar si la institución existe
      const institucionExistente = await this.findById(id);
      if (!institucionExistente) {
        throw new NotFoundException(`La institución con id ${id} no existe`);
      }

      const institucion = await this.prisma.institucion.update({
        where: { id },
        data: {
          ...(data.nombre && { nombre: data.nombre }),
          ...(data.direccion && { direccion: data.direccion }),
          telefono: data.telefono || null,
          email: data.email || null,
          sitioWeb: data.sitioWeb || null,
          logo: data.logo || null,
          colorPrimario: data.colorPrimario || null,
          colorSecundario: data.colorSecundario || null,
          ...(data.estado !== undefined && { estado: data.estado }),
          ...(data.adminId !== undefined && { adminId: data.adminId }),
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
    } catch (error) {
      this.logger.error(
        `Error al actualizar la institución con id ${id}: ${error.message}`,
      );
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      // Verificar si la institución existe
      const institucionExistente = await this.findById(id);
      if (!institucionExistente) {
        throw new NotFoundException(`La institución con id ${id} no existe`);
      }

      await this.prisma.institucion.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(
        `Error al eliminar la institución con id ${id}: ${error.message}`,
      );
      throw error;
    }
  }
}
