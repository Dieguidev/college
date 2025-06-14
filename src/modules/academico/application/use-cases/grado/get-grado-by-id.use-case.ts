// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\grado\get-grado-by-id.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Grado } from '../../../domain/entities';
import { GRADO_REPOSITORY } from '../../../domain/repositories/academico-repository.token';
import { IGradoRepository } from '../../../domain/repositories/grado.repository.interface';

@Injectable()
export class GetGradoByIdUseCase {
  constructor(
    @Inject(GRADO_REPOSITORY)
    private readonly gradoRepository: IGradoRepository,
  ) {}

  async execute(id: number, institucionId: number): Promise<Grado> {
    const grado = await this.gradoRepository.findById(id, institucionId);

    if (!grado) {
      throw new NotFoundException(`Grado con ID ${id} no encontrado`);
    }

    return grado;
  }
}
