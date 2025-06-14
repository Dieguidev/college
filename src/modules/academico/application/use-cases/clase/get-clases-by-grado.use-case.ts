// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\clase\get-clases-by-grado.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Clase } from '../../../domain/entities';
import {
  CLASE_REPOSITORY,
  GRADO_REPOSITORY,
} from '../../../domain/repositories/academico-repository.token';
import { IClaseRepository } from '../../../domain/repositories/clase.repository.interface';
import { IGradoRepository } from '../../../domain/repositories/grado.repository.interface';

@Injectable()
export class GetClasesByGradoUseCase {
  constructor(
    @Inject(CLASE_REPOSITORY)
    private readonly claseRepository: IClaseRepository,
    @Inject(GRADO_REPOSITORY)
    private readonly gradoRepository: IGradoRepository,
  ) {}

  async execute(gradoId: number, institucionId: number): Promise<Clase[]> {
    // Verificamos que exista el grado
    const grado = await this.gradoRepository.findById(gradoId, institucionId);
    if (!grado) {
      throw new NotFoundException(`Grado con ID ${gradoId} no encontrado`);
    }

    return this.claseRepository.findByGrado(gradoId, institucionId);
  }
}
