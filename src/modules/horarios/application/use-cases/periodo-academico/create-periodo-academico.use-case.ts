// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\horarios\application\use-cases\periodo-academico\create-periodo-academico.use-case.ts
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { PERIODO_ACADEMICO_REPOSITORY } from '../../../domain/repositories/horarios-repository.token';
import { PeriodoAcademicoRepositoryInterface } from '../../../domain/repositories/periodo-academico.repository.interface';
import { CreatePeriodoAcademicoDto } from '../../dto/create-periodo-academico.dto';
import { PeriodoAcademico } from '../../../domain/entities/periodo-academico.entity';

@Injectable()
export class CreatePeriodoAcademicoUseCase {
  constructor(
    @Inject(PERIODO_ACADEMICO_REPOSITORY)
    private readonly periodoAcademicoRepository: PeriodoAcademicoRepositoryInterface,
  ) {}

  async execute(
    createPeriodoAcademicoDto: CreatePeriodoAcademicoDto,
    institucionId: number,
  ): Promise<PeriodoAcademico> {
    // Validar fechas
    const fechaInicio = new Date(createPeriodoAcademicoDto.fechaInicio);
    const fechaFin = new Date(createPeriodoAcademicoDto.fechaFin);

    if (isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime())) {
      throw new BadRequestException('Las fechas proporcionadas no son válidas');
    }

    if (fechaInicio >= fechaFin) {
      throw new BadRequestException(
        'La fecha de inicio debe ser anterior a la fecha de fin',
      );
    }

    // Crear el periodo académico
    return this.periodoAcademicoRepository.create(
      {
        nombre: createPeriodoAcademicoDto.nombre,
        fechaInicio,
        fechaFin,
        anioAcademicoId: createPeriodoAcademicoDto.anioAcademicoId,
      },
      institucionId,
    );
  }
}
