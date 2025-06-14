import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IInstitucionRepository } from '../../domain/repositories/institucion.repository.interface';
import { INSTITUCION_REPOSITORY } from '../../domain/repositories/institucion-repository.token';
import { Institucion } from '../../domain/entities';

@Injectable()
export class GetInstitucionesUseCase {
  constructor(
    @Inject(INSTITUCION_REPOSITORY)
    private readonly institucionRepository: IInstitucionRepository,
  ) {}

  async execute(): Promise<Institucion[]> {
    return this.institucionRepository.findAll();
  }
}

@Injectable()
export class GetInstitucionByIdUseCase {
  constructor(
    @Inject(INSTITUCION_REPOSITORY)
    private readonly institucionRepository: IInstitucionRepository,
  ) {}

  async execute(id: number): Promise<Institucion> {
    const institucion = await this.institucionRepository.findById(id);
    if (!institucion) {
      throw new NotFoundException(`La institución con id ${id} no existe`);
    }
    return institucion;
  }
}

@Injectable()
export class DeleteInstitucionUseCase {
  constructor(
    @Inject(INSTITUCION_REPOSITORY)
    private readonly institucionRepository: IInstitucionRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const institucion = await this.institucionRepository.findById(id);
    if (!institucion) {
      throw new NotFoundException(`La institución con id ${id} no existe`);
    }
    return this.institucionRepository.delete(id);
  }
}
