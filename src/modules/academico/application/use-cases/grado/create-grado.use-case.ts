// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\grado\create-grado.use-case.ts
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
import { CreateGradoDto } from '../../dto';

@Injectable()
export class CreateGradoUseCase {
  constructor(
    @Inject(GRADO_REPOSITORY)
    private readonly gradoRepository: IGradoRepository,
    @Inject(NIVEL_REPOSITORY)
    private readonly nivelRepository: INivelRepository,
    @Inject(ANIO_ACADEMICO_REPOSITORY)
    private readonly anioAcademicoRepository: IAnioAcademicoRepository,
  ) {}

  async execute(
    createGradoDto: CreateGradoDto,
    institucionId: number,
  ): Promise<Grado> {
    // Verificamos que exista el nivel
    const nivel = await this.nivelRepository.findById(
      createGradoDto.nivelId,
      institucionId,
    );
    if (!nivel) {
      throw new NotFoundException(
        `Nivel con ID ${createGradoDto.nivelId} no encontrado`,
      );
    }

    // Verificamos que exista el año académico
    const anioAcademico = await this.anioAcademicoRepository.findById(
      createGradoDto.anioAcademicoId,
      institucionId,
    );
    if (!anioAcademico) {
      throw new NotFoundException(
        `Año académico con ID ${createGradoDto.anioAcademicoId} no encontrado`,
      );
    }

    const data: Partial<Grado> = {
      nombre: createGradoDto.nombre,
      nivelId: createGradoDto.nivelId,
      anioAcademicoId: createGradoDto.anioAcademicoId,
      descripcion: createGradoDto.descripcion,
      institucionId,
    };

    return this.gradoRepository.create(data);
  }
}
