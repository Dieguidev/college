// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\anio-academico\get-anio-academico-by-id.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AnioAcademico } from '../../../domain/entities';
import { ANIO_ACADEMICO_REPOSITORY } from '../../../domain/repositories/academico-repository.token';
import { IAnioAcademicoRepository } from '../../../domain/repositories/anio-academico.repository.interface';

@Injectable()
export class GetAnioAcademicoByIdUseCase {
  constructor(
    @Inject(ANIO_ACADEMICO_REPOSITORY)
    private readonly anioAcademicoRepository: IAnioAcademicoRepository,
  ) {}

  async execute(id: number, institucionId: number): Promise<AnioAcademico> {
    const anioAcademico = await this.anioAcademicoRepository.findById(
      id,
      institucionId,
    );

    if (!anioAcademico) {
      throw new NotFoundException(`Año académico con ID ${id} no encontrado`);
    }

    return anioAcademico;
  }
}
