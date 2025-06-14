// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\nivel\update-nivel.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Nivel } from '../../../domain/entities';
import { NIVEL_REPOSITORY } from '../../../domain/repositories/academico-repository.token';
import { INivelRepository } from '../../../domain/repositories/nivel.repository.interface';
import { UpdateNivelDto } from '../../dto';

@Injectable()
export class UpdateNivelUseCase {
  constructor(
    @Inject(NIVEL_REPOSITORY)
    private readonly nivelRepository: INivelRepository,
  ) {}

  async execute(
    id: number,
    updateNivelDto: UpdateNivelDto,
    institucionId: number,
  ): Promise<Nivel> {
    const nivelExistente = await this.nivelRepository.findById(
      id,
      institucionId,
    );

    if (!nivelExistente) {
      throw new NotFoundException(`Nivel con ID ${id} no encontrado`);
    }

    return this.nivelRepository.update(id, updateNivelDto, institucionId);
  }
}
