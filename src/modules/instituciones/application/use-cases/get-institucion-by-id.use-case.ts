import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { INSTITUCIONES_REPOSITORY } from '../../domain/repositories/instituciones-repository.token';
import { IInstitucionesRepository } from '../../domain/repositories/instituciones.repository.interface';
import { Institucion } from '../../domain/entities/institucion.entity';

@Injectable()
export class GetInstitucionByIdUseCase {
  constructor(
    @Inject(INSTITUCIONES_REPOSITORY)
    private readonly institucionesRepository: IInstitucionesRepository,
  ) {}

  async execute(id: number): Promise<Institucion> {
    const institucion = await this.institucionesRepository.findById(id);
    if (!institucion) {
      throw new NotFoundException(`Institución con ID ${id} no encontrada`);
    }
    return institucion;
  }
}
