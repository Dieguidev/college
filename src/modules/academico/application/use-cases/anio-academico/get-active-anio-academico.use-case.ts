// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\anio-academico\get-active-anio-academico.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AnioAcademico } from '../../../domain/entities';
import { ANIO_ACADEMICO_REPOSITORY } from '../../../domain/repositories/academico-repository.token';
import { IAnioAcademicoRepository } from '../../../domain/repositories/anio-academico.repository.interface';

@Injectable()
export class GetActiveAnioAcademicoUseCase {
  constructor(
    @Inject(ANIO_ACADEMICO_REPOSITORY)
    private readonly anioAcademicoRepository: IAnioAcademicoRepository,
  ) {}

  async execute(institucionId: number): Promise<AnioAcademico> {
    const anioAcademicoActivo =
      await this.anioAcademicoRepository.findActiveYear(institucionId);

    if (!anioAcademicoActivo) {
      throw new NotFoundException('No hay un año académico activo');
    }

    return anioAcademicoActivo;
  }
}
