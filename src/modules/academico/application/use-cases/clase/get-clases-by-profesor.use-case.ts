// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\clase\get-clases-by-profesor.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { Clase } from '../../../domain/entities';
import { CLASE_REPOSITORY } from '../../../domain/repositories/academico-repository.token';
import { IClaseRepository } from '../../../domain/repositories/clase.repository.interface';

@Injectable()
export class GetClasesByProfesorUseCase {
  constructor(
    @Inject(CLASE_REPOSITORY)
    private readonly claseRepository: IClaseRepository,
  ) {}

  async execute(profesorId: number, institucionId: number): Promise<Clase[]> {
    // Aquí no validamos que exista el profesor porque podría ser de otro módulo
    // y generaría una dependencia circular. Se asume que el front-end solo permitirá
    // buscar por profesores existentes.

    return this.claseRepository.findByProfesor(profesorId, institucionId);
  }
}
