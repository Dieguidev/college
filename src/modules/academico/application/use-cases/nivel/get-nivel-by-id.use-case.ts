// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\nivel\get-nivel-by-id.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Nivel } from '../../../domain/entities';
import { NIVEL_REPOSITORY } from '../../../domain/repositories/academico-repository.token';
import { INivelRepository } from '../../../domain/repositories/nivel.repository.interface';

@Injectable()
export class GetNivelByIdUseCase {
  constructor(
    @Inject(NIVEL_REPOSITORY)
    private readonly nivelRepository: INivelRepository,
  ) {}

  async execute(id: number, institucionId: number): Promise<Nivel> {
    const nivel = await this.nivelRepository.findById(id, institucionId);

    if (!nivel) {
      throw new NotFoundException(`Nivel con ID ${id} no encontrado`);
    }

    return nivel;
  }
}
