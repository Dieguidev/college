// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\horarios\application\use-cases\periodo-academico\get-all-periodos-academicos.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { PERIODO_ACADEMICO_REPOSITORY } from '../../../domain/repositories/horarios-repository.token';
import { PeriodoAcademicoRepositoryInterface } from '../../../domain/repositories/periodo-academico.repository.interface';
import { PeriodoAcademico } from '../../../domain/entities/periodo-academico.entity';

@Injectable()
export class GetAllPeriodosAcademicosUseCase {
  constructor(
    @Inject(PERIODO_ACADEMICO_REPOSITORY)
    private readonly periodoAcademicoRepository: PeriodoAcademicoRepositoryInterface,
  ) {}

  async execute(institucionId: number): Promise<PeriodoAcademico[]> {
    return this.periodoAcademicoRepository.findAll(institucionId);
  }
}
