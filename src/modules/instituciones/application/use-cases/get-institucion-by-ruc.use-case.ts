import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { INSTITUCIONES_REPOSITORY } from '../../domain/repositories/instituciones-repository.token';
import { IInstitucionesRepository } from '../../domain/repositories/instituciones.repository.interface';
import { Institucion } from '../../domain/entities/institucion.entity';

@Injectable()
export class GetInstitucionByRucUseCase {
  constructor(
    @Inject(INSTITUCIONES_REPOSITORY)
    private readonly institucionesRepository: IInstitucionesRepository,
  ) {}

  async execute(ruc: string): Promise<Institucion> {
    const institucion = await this.institucionesRepository.findByRUC(ruc);
    if (!institucion) {
      throw new NotFoundException(`Institución con RUC ${ruc} no encontrada`);
    }
    return institucion;
  }
}
