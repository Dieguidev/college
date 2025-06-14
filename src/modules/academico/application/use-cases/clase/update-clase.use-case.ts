// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\clase\update-clase.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Clase } from '../../../domain/entities';
import {
  CLASE_REPOSITORY,
  CURSO_REPOSITORY,
  GRADO_REPOSITORY,
} from '../../../domain/repositories/academico-repository.token';
import { IClaseRepository } from '../../../domain/repositories/clase.repository.interface';
import { ICursoRepository } from '../../../domain/repositories/curso.repository.interface';
import { IGradoRepository } from '../../../domain/repositories/grado.repository.interface';
import { UpdateClaseDto } from '../../dto';

@Injectable()
export class UpdateClaseUseCase {
  constructor(
    @Inject(CLASE_REPOSITORY)
    private readonly claseRepository: IClaseRepository,
    @Inject(CURSO_REPOSITORY)
    private readonly cursoRepository: ICursoRepository,
    @Inject(GRADO_REPOSITORY)
    private readonly gradoRepository: IGradoRepository,
  ) {}

  async execute(
    id: number,
    updateClaseDto: UpdateClaseDto,
    institucionId: number,
  ): Promise<Clase> {
    // Verificamos que exista la clase
    const claseExistente = await this.claseRepository.findById(
      id,
      institucionId,
    );
    if (!claseExistente) {
      throw new NotFoundException(`Clase con ID ${id} no encontrada`);
    }

    // Si se actualizó el curso, verificamos que exista
    if (updateClaseDto.cursoId) {
      const curso = await this.cursoRepository.findById(
        updateClaseDto.cursoId,
        institucionId,
      );
      if (!curso) {
        throw new NotFoundException(
          `Curso con ID ${updateClaseDto.cursoId} no encontrado`,
        );
      }
    }

    // Si se actualizó el grado, verificamos que exista
    if (updateClaseDto.gradoId) {
      const grado = await this.gradoRepository.findById(
        updateClaseDto.gradoId,
        institucionId,
      );
      if (!grado) {
        throw new NotFoundException(
          `Grado con ID ${updateClaseDto.gradoId} no encontrado`,
        );
      }
    }

    // No validamos que exista el profesor (personalId) porque podría ser de otro módulo
    // y generaría una dependencia circular. Se asume que el front-end solo permitirá
    // seleccionar profesores existentes.

    return this.claseRepository.update(id, updateClaseDto, institucionId);
  }
}
