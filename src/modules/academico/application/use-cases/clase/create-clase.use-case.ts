// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\clase\create-clase.use-case.ts
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
import { CreateClaseDto } from '../../dto';

@Injectable()
export class CreateClaseUseCase {
  constructor(
    @Inject(CLASE_REPOSITORY)
    private readonly claseRepository: IClaseRepository,
    @Inject(CURSO_REPOSITORY)
    private readonly cursoRepository: ICursoRepository,
    @Inject(GRADO_REPOSITORY)
    private readonly gradoRepository: IGradoRepository,
  ) {}

  async execute(
    createClaseDto: CreateClaseDto,
    institucionId: number,
  ): Promise<Clase> {
    // Verificamos que exista el curso
    const curso = await this.cursoRepository.findById(
      createClaseDto.cursoId,
      institucionId,
    );
    if (!curso) {
      throw new NotFoundException(
        `Curso con ID ${createClaseDto.cursoId} no encontrado`,
      );
    }

    // Verificamos que exista el grado
    const grado = await this.gradoRepository.findById(
      createClaseDto.gradoId,
      institucionId,
    );
    if (!grado) {
      throw new NotFoundException(
        `Grado con ID ${createClaseDto.gradoId} no encontrado`,
      );
    }

    // No validamos que exista el profesor (personalId) porque podría ser de otro módulo
    // y generaría una dependencia circular. Se asume que el front-end sólo permitirá
    // seleccionar profesores existentes.

    const data: Partial<Clase> = {
      cursoId: createClaseDto.cursoId,
      gradoId: createClaseDto.gradoId,
      personalId: createClaseDto.personalId,
      horasSemanales: createClaseDto.horasSemanales,
      descripcion: createClaseDto.descripcion,
      institucionId,
    };

    return this.claseRepository.create(data);
  }
}
