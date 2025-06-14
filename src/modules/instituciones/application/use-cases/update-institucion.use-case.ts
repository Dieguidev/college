import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateInstitucionDto } from '../../application/dto/update-institucion.dto';
import { IInstitucionRepository } from '../../domain/repositories/institucion.repository.interface';
import { INSTITUCION_REPOSITORY } from '../../domain/repositories/institucion-repository.token';
import { Institucion } from '../../domain/entities';

@Injectable()
export class UpdateInstitucionUseCase {
  constructor(
    @Inject(INSTITUCION_REPOSITORY)
    private readonly institucionRepository: IInstitucionRepository,
  ) {}

  async execute(
    id: number,
    updateInstitucionDto: UpdateInstitucionDto,
  ): Promise<Institucion> {
    // Verificamos que la institución exista
    const institucion = await this.institucionRepository.findById(id);
    if (!institucion) {
      throw new NotFoundException(`La institución con id ${id} no existe`);
    }

    // Actualizamos la institución
    return this.institucionRepository.update(id, updateInstitucionDto);
  }
}
