// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\grado\get-grados-by-nivel.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Grado } from '../../../domain/entities';
import {
  GRADO_REPOSITORY,
  NIVEL_REPOSITORY,
} from '../../../domain/repositories/academico-repository.token';
import { IGradoRepository } from '../../../domain/repositories/grado.repository.interface';
import { INivelRepository } from '../../../domain/repositories/nivel.repository.interface';

@Injectable()
export class GetGradosByNivelUseCase {
  constructor(
    @Inject(GRADO_REPOSITORY)
    private readonly gradoRepository: IGradoRepository,
    @Inject(NIVEL_REPOSITORY)
    private readonly nivelRepository: INivelRepository,
  ) {}

  async execute(nivelId: number, institucionId: number): Promise<Grado[]> {
    // Verificamos que exista el nivel
    const nivel = await this.nivelRepository.findById(nivelId, institucionId);
    if (!nivel) {
      throw new NotFoundException(`Nivel con ID ${nivelId} no encontrado`);
    }

    return this.gradoRepository.findByNivel(nivelId, institucionId);
  }
}
