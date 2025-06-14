// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\horarios\application\use-cases\periodo-academico\get-periodo-academico-by-id.use-case.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PERIODO_ACADEMICO_REPOSITORY } from '../../../domain/repositories/horarios-repository.token';
import { PeriodoAcademicoRepositoryInterface } from '../../../domain/repositories/periodo-academico.repository.interface';
import { PeriodoAcademico } from '../../../domain/entities/periodo-academico.entity';

@Injectable()
export class GetPeriodoAcademicoByIdUseCase {
  constructor(
    @Inject(PERIODO_ACADEMICO_REPOSITORY)
    private readonly periodoAcademicoRepository: PeriodoAcademicoRepositoryInterface,
  ) {}

  async execute(id: number, institucionId: number): Promise<PeriodoAcademico> {
    const periodo = await this.periodoAcademicoRepository.findById(
      id,
      institucionId,
    );
    if (!periodo) {
      throw new NotFoundException(
        `Periodo académico con ID ${id} no encontrado`,
      );
    }
    return periodo;
  }
}
