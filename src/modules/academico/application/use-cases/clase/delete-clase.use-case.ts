// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\clase\delete-clase.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CLASE_REPOSITORY } from '../../../domain/repositories/academico-repository.token';
import { IClaseRepository } from '../../../domain/repositories/clase.repository.interface';

@Injectable()
export class DeleteClaseUseCase {
  constructor(
    @Inject(CLASE_REPOSITORY)
    private readonly claseRepository: IClaseRepository,
  ) {}

  async execute(id: number, institucionId: number): Promise<void> {
    const clase = await this.claseRepository.findById(id, institucionId);

    if (!clase) {
      throw new NotFoundException(`Clase con ID ${id} no encontrada`);
    }

    return this.claseRepository.remove(id, institucionId);
  }
}
