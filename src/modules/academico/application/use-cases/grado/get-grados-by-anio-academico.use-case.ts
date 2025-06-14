// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\grado\get-grados-by-anio-academico.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Grado } from '../../../domain/entities';
import {
  GRADO_REPOSITORY,
  ANIO_ACADEMICO_REPOSITORY,
} from '../../../domain/repositories/academico-repository.token';
import { IGradoRepository } from '../../../domain/repositories/grado.repository.interface';
import { IAnioAcademicoRepository } from '../../../domain/repositories/anio-academico.repository.interface';

@Injectable()
export class GetGradosByAnioAcademicoUseCase {
  constructor(
    @Inject(GRADO_REPOSITORY)
    private readonly gradoRepository: IGradoRepository,
    @Inject(ANIO_ACADEMICO_REPOSITORY)
    private readonly anioAcademicoRepository: IAnioAcademicoRepository,
  ) {}

  async execute(
    anioAcademicoId: number,
    institucionId: number,
  ): Promise<Grado[]> {
    // Verificamos que exista el año académico
    const anioAcademico = await this.anioAcademicoRepository.findById(
      anioAcademicoId,
      institucionId,
    );
    if (!anioAcademico) {
      throw new NotFoundException(
        `Año académico con ID ${anioAcademicoId} no encontrado`,
      );
    }

    return this.gradoRepository.findByAnioAcademico(
      anioAcademicoId,
      institucionId,
    );
  }
}
