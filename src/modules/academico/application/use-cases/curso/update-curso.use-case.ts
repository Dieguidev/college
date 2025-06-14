// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\curso\update-curso.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Curso } from '../../../domain/entities';
import { CURSO_REPOSITORY } from '../../../domain/repositories/academico-repository.token';
import { ICursoRepository } from '../../../domain/repositories/curso.repository.interface';
import { UpdateCursoDto } from '../../dto';

@Injectable()
export class UpdateCursoUseCase {
  constructor(
    @Inject(CURSO_REPOSITORY)
    private readonly cursoRepository: ICursoRepository,
  ) {}

  async execute(
    id: number,
    updateCursoDto: UpdateCursoDto,
    institucionId: number,
  ): Promise<Curso> {
    const cursoExistente = await this.cursoRepository.findById(
      id,
      institucionId,
    );

    if (!cursoExistente) {
      throw new NotFoundException(`Curso con ID ${id} no encontrado`);
    }

    return this.cursoRepository.update(id, updateCursoDto, institucionId);
  }
}
