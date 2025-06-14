import { Injectable, Inject } from '@nestjs/common';
import { INSTITUCIONES_REPOSITORY } from '../../domain/repositories/instituciones-repository.token';
import { IInstitucionesRepository } from '../../domain/repositories/instituciones.repository.interface';
import { Institucion } from '../../domain/entities/institucion.entity';

@Injectable()
export class GetAllInstitucionesUseCase {
  constructor(
    @Inject(INSTITUCIONES_REPOSITORY)
    private readonly institucionesRepository: IInstitucionesRepository,
  ) {}

  async execute(): Promise<Institucion[]> {
    return this.institucionesRepository.findAll();
  }
}
