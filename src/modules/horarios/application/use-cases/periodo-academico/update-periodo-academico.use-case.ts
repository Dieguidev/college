// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\horarios\application\use-cases\periodo-academico\update-periodo-academico.use-case.ts
import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PERIODO_ACADEMICO_REPOSITORY } from '../../../domain/repositories/horarios-repository.token';
import { PeriodoAcademicoRepositoryInterface } from '../../../domain/repositories/periodo-academico.repository.interface';
import { UpdatePeriodoAcademicoDto } from '../../dto/update-periodo-academico.dto';
import { PeriodoAcademico } from '../../../domain/entities/periodo-academico.entity';

@Injectable()
export class UpdatePeriodoAcademicoUseCase {
  constructor(
    @Inject(PERIODO_ACADEMICO_REPOSITORY)
    private readonly periodoAcademicoRepository: PeriodoAcademicoRepositoryInterface,
  ) {}

  async execute(
    id: number,
    updatePeriodoAcademicoDto: UpdatePeriodoAcademicoDto,
    institucionId: number,
  ): Promise<PeriodoAcademico> {
    // Verificar que el periodo existe
    const periodo = await this.periodoAcademicoRepository.findById(
      id,
      institucionId,
    );
    if (!periodo) {
      throw new NotFoundException(
        `Periodo académico con ID ${id} no encontrado`,
      );
    }

    // Validar fechas si se están actualizando
    if (
      updatePeriodoAcademicoDto.fechaInicio ||
      updatePeriodoAcademicoDto.fechaFin
    ) {
      const fechaInicio = updatePeriodoAcademicoDto.fechaInicio
        ? new Date(updatePeriodoAcademicoDto.fechaInicio)
        : periodo.fechaInicio;

      const fechaFin = updatePeriodoAcademicoDto.fechaFin
        ? new Date(updatePeriodoAcademicoDto.fechaFin)
        : periodo.fechaFin;

      if (isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime())) {
        throw new BadRequestException(
          'Las fechas proporcionadas no son válidas',
        );
      }

      if (fechaInicio >= fechaFin) {
        throw new BadRequestException(
          'La fecha de inicio debe ser anterior a la fecha de fin',
        );
      }
    }

    // Actualizar el periodo académico
    return this.periodoAcademicoRepository.update(
      id,
      updatePeriodoAcademicoDto,
      institucionId,
    );
  }
}
