// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\anio-academico\update-anio-academico.use-case.ts
import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { AnioAcademico } from '../../../domain/entities';
import { ANIO_ACADEMICO_REPOSITORY } from '../../../domain/repositories/academico-repository.token';
import { IAnioAcademicoRepository } from '../../../domain/repositories/anio-academico.repository.interface';
import { UpdateAnioAcademicoDto } from '../../dto';

@Injectable()
export class UpdateAnioAcademicoUseCase {
  constructor(
    @Inject(ANIO_ACADEMICO_REPOSITORY)
    private readonly anioAcademicoRepository: IAnioAcademicoRepository,
  ) {}

  async execute(
    id: number,
    updateAnioAcademicoDto: UpdateAnioAcademicoDto,
    institucionId: number,
  ): Promise<AnioAcademico> {
    const anioAcademicoExistente = await this.anioAcademicoRepository.findById(
      id,
      institucionId,
    );

    if (!anioAcademicoExistente) {
      throw new NotFoundException(`Año académico con ID ${id} no encontrado`);
    }

    // Si se actualizan las fechas, validamos que la fecha de inicio sea anterior a la fecha de fin
    if (updateAnioAcademicoDto.fechaInicio && updateAnioAcademicoDto.fechaFin) {
      if (
        updateAnioAcademicoDto.fechaInicio >= updateAnioAcademicoDto.fechaFin
      ) {
        throw new BadRequestException(
          'La fecha de inicio debe ser anterior a la fecha de fin',
        );
      }
    } else if (
      updateAnioAcademicoDto.fechaInicio &&
      !updateAnioAcademicoDto.fechaFin
    ) {
      if (
        updateAnioAcademicoDto.fechaInicio >= anioAcademicoExistente.fechaFin
      ) {
        throw new BadRequestException(
          'La fecha de inicio debe ser anterior a la fecha de fin',
        );
      }
    } else if (
      !updateAnioAcademicoDto.fechaInicio &&
      updateAnioAcademicoDto.fechaFin
    ) {
      if (
        anioAcademicoExistente.fechaInicio >= updateAnioAcademicoDto.fechaFin
      ) {
        throw new BadRequestException(
          'La fecha de inicio debe ser anterior a la fecha de fin',
        );
      }
    }

    return this.anioAcademicoRepository.update(
      id,
      updateAnioAcademicoDto,
      institucionId,
    );
  }
}
