import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInstitucionDto } from '../../application/dto/create-institucion.dto';
import { IInstitucionRepository } from '../../domain/repositories/institucion.repository.interface';
import { INSTITUCION_REPOSITORY } from '../../domain/repositories/institucion-repository.token';
import { Institucion } from '../../domain/entities';

@Injectable()
export class CreateInstitucionUseCase {
  constructor(
    @Inject(INSTITUCION_REPOSITORY)
    private readonly institucionRepository: IInstitucionRepository,
  ) {}

  async execute(
    createInstitucionDto: CreateInstitucionDto,
  ): Promise<Institucion> {
    // Validamos si ya existe una institución con el mismo RUC
    const existingInstitucion = await this.institucionRepository.findByRuc(
      createInstitucionDto.ruc,
    );
    if (existingInstitucion) {
      throw new Error(
        `Ya existe una institución con el RUC ${createInstitucionDto.ruc}`,
      );
    }

    // Crear la institución
    return this.institucionRepository.create(createInstitucionDto);
  }
}
