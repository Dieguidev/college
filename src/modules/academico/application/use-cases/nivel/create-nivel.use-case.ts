// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\nivel\create-nivel.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { Nivel } from '../../../domain/entities';
import { NIVEL_REPOSITORY } from '../../../domain/repositories/academico-repository.token';
import { INivelRepository } from '../../../domain/repositories/nivel.repository.interface';
import { CreateNivelDto } from '../../dto';

@Injectable()
export class CreateNivelUseCase {
  constructor(
    @Inject(NIVEL_REPOSITORY)
    private readonly nivelRepository: INivelRepository,
  ) {}

  async execute(
    createNivelDto: CreateNivelDto,
    institucionId: number,
  ): Promise<Nivel> {
    const data: Partial<Nivel> = {
      nombre: createNivelDto.nombre,
      descripcion: createNivelDto.descripcion,
      institucionId,
    };

    return this.nivelRepository.create(data);
  }
}
