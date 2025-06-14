// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\grado\update-grado.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Grado } from '../../../domain/entities';
import {
  GRADO_REPOSITORY,
  NIVEL_REPOSITORY,
  ANIO_ACADEMICO_REPOSITORY,
} from '../../../domain/repositories/academico-repository.token';
import { IGradoRepository } from '../../../domain/repositories/grado.repository.interface';
import { INivelRepository } from '../../../domain/repositories/nivel.repository.interface';
import { IAnioAcademicoRepository } from '../../../domain/repositories/anio-academico.repository.interface';
import { UpdateGradoDto } from '../../dto';

@Injectable()
export class UpdateGradoUseCase {
  constructor(
    @Inject(GRADO_REPOSITORY)
    private readonly gradoRepository: IGradoRepository,
    @Inject(NIVEL_REPOSITORY)
    private readonly nivelRepository: INivelRepository,
    @Inject(ANIO_ACADEMICO_REPOSITORY)
    private readonly anioAcademicoRepository: IAnioAcademicoRepository,
  ) {}

  async execute(
    id: number,
    updateGradoDto: UpdateGradoDto,
    institucionId: number,
  ): Promise<Grado> {
    // Verificamos que exista el grado
    const gradoExistente = await this.gradoRepository.findById(
      id,
      institucionId,
    );
    if (!gradoExistente) {
      throw new NotFoundException(`Grado con ID ${id} no encontrado`);
    }

    // Si se actualizó el nivel, verificamos que exista
    if (updateGradoDto.nivelId) {
      const nivel = await this.nivelRepository.findById(
        updateGradoDto.nivelId,
        institucionId,
      );
      if (!nivel) {
        throw new NotFoundException(
          `Nivel con ID ${updateGradoDto.nivelId} no encontrado`,
        );
      }
    }

    // Si se actualizó el año académico, verificamos que exista
    if (updateGradoDto.anioAcademicoId) {
      const anioAcademico = await this.anioAcademicoRepository.findById(
        updateGradoDto.anioAcademicoId,
        institucionId,
      );
      if (!anioAcademico) {
        throw new NotFoundException(
          `Año académico con ID ${updateGradoDto.anioAcademicoId} no encontrado`,
        );
      }
    }

    return this.gradoRepository.update(id, updateGradoDto, institucionId);
  }
}
