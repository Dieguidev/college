// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\clase\get-all-clases.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { Clase } from '../../../domain/entities';
import { CLASE_REPOSITORY } from '../../../domain/repositories/academico-repository.token';
import { IClaseRepository } from '../../../domain/repositories/clase.repository.interface';

@Injectable()
export class GetAllClasesUseCase {
  constructor(
    @Inject(CLASE_REPOSITORY)
    private readonly claseRepository: IClaseRepository,
  ) {}

  async execute(institucionId: number): Promise<Clase[]> {
    return this.claseRepository.findAll(institucionId);
  }
}
