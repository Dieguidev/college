// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\anio-academico\get-all-anios-academicos.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { AnioAcademico } from '../../../domain/entities';
import { ANIO_ACADEMICO_REPOSITORY } from '../../../domain/repositories/academico-repository.token';
import { IAnioAcademicoRepository } from '../../../domain/repositories/anio-academico.repository.interface';

@Injectable()
export class GetAllAniosAcademicosUseCase {
  constructor(
    @Inject(ANIO_ACADEMICO_REPOSITORY)
    private readonly anioAcademicoRepository: IAnioAcademicoRepository,
  ) {}

  async execute(institucionId: number): Promise<AnioAcademico[]> {
    return this.anioAcademicoRepository.findAll(institucionId);
  }
}
