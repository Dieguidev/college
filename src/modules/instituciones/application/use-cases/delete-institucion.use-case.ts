import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { INSTITUCIONES_REPOSITORY } from '../../domain/repositories/instituciones-repository.token';
import { IInstitucionesRepository } from '../../domain/repositories/instituciones.repository.interface';

@Injectable()
export class DeleteInstitucionUseCase {
  constructor(
    @Inject(INSTITUCIONES_REPOSITORY)
    private readonly institucionesRepository: IInstitucionesRepository,
  ) {}

  async execute(id: number): Promise<void> {
    // Primero verificamos que la institución existe
    const institucion = await this.institucionesRepository.findById(id);
    if (!institucion) {
      throw new NotFoundException(`Institución con ID ${id} no encontrada`);
    }

    // Eliminamos la institución
    await this.institucionesRepository.remove(id);
  }
}
