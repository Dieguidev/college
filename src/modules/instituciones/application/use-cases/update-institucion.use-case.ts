import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { INSTITUCIONES_REPOSITORY } from '../../domain/repositories/instituciones-repository.token';
import { IInstitucionesRepository } from '../../domain/repositories/instituciones.repository.interface';
import { Institucion } from '../../domain/entities/institucion.entity';
import { UpdateInstitucionDto } from '../dto/update-institucion.dto';

@Injectable()
export class UpdateInstitucionUseCase {
  constructor(
    @Inject(INSTITUCIONES_REPOSITORY)
    private readonly institucionesRepository: IInstitucionesRepository,
  ) {}

  async execute(
    id: number,
    updateInstitucionDto: UpdateInstitucionDto,
  ): Promise<Institucion> {
    // Primero verificamos que la institución existe
    const institucion = await this.institucionesRepository.findById(id);
    if (!institucion) {
      throw new NotFoundException(`Institución con ID ${id} no encontrada`);
    }

    // Eliminamos propiedades relacionadas con el administrador para no actualizarlas
    const {
      adminDni,
      adminNombres,
      adminApellidos,
      adminTelefono,
      adminEmail,
      ...updateData
    } = updateInstitucionDto;

    // Actualizamos la institución
    return this.institucionesRepository.update(id, updateData);
  }
}
