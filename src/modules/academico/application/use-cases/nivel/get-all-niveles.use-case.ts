// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\nivel\get-all-niveles.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { Nivel } from '../../../domain/entities';
import { NIVEL_REPOSITORY } from '../../../domain/repositories/academico-repository.token';
import { INivelRepository } from '../../../domain/repositories/nivel.repository.interface';

@Injectable()
export class GetAllNivelesUseCase {
  constructor(
    @Inject(NIVEL_REPOSITORY)
    private readonly nivelRepository: INivelRepository,
  ) {}

  async execute(institucionId: number): Promise<Nivel[]> {
    return this.nivelRepository.findAll(institucionId);
  }
}
