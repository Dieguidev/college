// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\grado\get-all-grados.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { Grado } from '../../../domain/entities';
import { GRADO_REPOSITORY } from '../../../domain/repositories/academico-repository.token';
import { IGradoRepository } from '../../../domain/repositories/grado.repository.interface';

@Injectable()
export class GetAllGradosUseCase {
  constructor(
    @Inject(GRADO_REPOSITORY)
    private readonly gradoRepository: IGradoRepository,
  ) {}

  async execute(institucionId: number): Promise<Grado[]> {
    return this.gradoRepository.findAll(institucionId);
  }
}
