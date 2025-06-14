// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\nivel\delete-nivel.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NIVEL_REPOSITORY } from '../../../domain/repositories/academico-repository.token';
import { INivelRepository } from '../../../domain/repositories/nivel.repository.interface';

@Injectable()
export class DeleteNivelUseCase {
  constructor(
    @Inject(NIVEL_REPOSITORY)
    private readonly nivelRepository: INivelRepository,
  ) {}

  async execute(id: number, institucionId: number): Promise<void> {
    const nivel = await this.nivelRepository.findById(id, institucionId);

    if (!nivel) {
      throw new NotFoundException(`Nivel con ID ${id} no encontrado`);
    }

    return this.nivelRepository.remove(id, institucionId);
  }
}
