// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\evaluaciones\infrastructure\repositories\tipo-evaluacion.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma/prisma.service';
import { TipoEvaluacionRepositoryInterface } from '../../domain/repositories/tipo-evaluacion.repository.interface';
import { TipoEvaluacion } from '../../domain/entities/tipo-evaluacion.entity';

@Injectable()
export class TipoEvaluacionRepository
  implements TipoEvaluacionRepositoryInterface
{
  constructor(private prisma: PrismaService) {}

  async create(
    tipoEvaluacion: Partial<TipoEvaluacion>,
    institucionId: number,
  ): Promise<TipoEvaluacion> {
    const newTipoEvaluacion = await this.prisma.tipoEvaluacion.create({
      data: {
        nombre: tipoEvaluacion.nombre,
        descripcion: tipoEvaluacion.descripcion,
        peso: tipoEvaluacion.peso,
        institucionId,
      },
    });
    return new TipoEvaluacion(newTipoEvaluacion);
  }

  async findAll(institucionId: number): Promise<TipoEvaluacion[]> {
    const tiposEvaluacion = await this.prisma.tipoEvaluacion.findMany({
      where: {
        institucionId,
        deletedAt: null,
      },
    });
    return tiposEvaluacion.map((tipo) => new TipoEvaluacion(tipo));
  }

  async findById(
    id: number,
    institucionId: number,
  ): Promise<TipoEvaluacion | null> {
    const tipoEvaluacion = await this.prisma.tipoEvaluacion.findFirst({
      where: {
        id,
        institucionId,
        deletedAt: null,
      },
    });
    return tipoEvaluacion ? new TipoEvaluacion(tipoEvaluacion) : null;
  }

  async update(
    id: number,
    tipoEvaluacion: Partial<TipoEvaluacion>,
    institucionId: number,
  ): Promise<TipoEvaluacion> {
    const updatedTipoEvaluacion = await this.prisma.tipoEvaluacion.update({
      where: {
        id,
        institucionId,
      },
      data: {
        nombre: tipoEvaluacion.nombre,
        descripcion: tipoEvaluacion.descripcion,
        peso: tipoEvaluacion.peso,
      },
    });
    return new TipoEvaluacion(updatedTipoEvaluacion);
  }

  async delete(id: number, institucionId: number): Promise<TipoEvaluacion> {
    const deletedTipoEvaluacion = await this.prisma.tipoEvaluacion.update({
      where: {
        id,
        institucionId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return new TipoEvaluacion(deletedTipoEvaluacion);
  }
}
