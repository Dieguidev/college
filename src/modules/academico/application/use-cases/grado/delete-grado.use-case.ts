// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\grado\delete-grado.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GRADO_REPOSITORY } from '../../../domain/repositories/academico-repository.token';
import { IGradoRepository } from '../../../domain/repositories/grado.repository.interface';

@Injectable()
export class DeleteGradoUseCase {
  constructor(
    @Inject(GRADO_REPOSITORY)
    private readonly gradoRepository: IGradoRepository,
  ) {}

  async execute(id: number, institucionId: number): Promise<void> {
    const grado = await this.gradoRepository.findById(id, institucionId);

    if (!grado) {
      throw new NotFoundException(`Grado con ID ${id} no encontrado`);
    }

    return this.gradoRepository.remove(id, institucionId);
  }
}
