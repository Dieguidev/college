// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\curso\delete-curso.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CURSO_REPOSITORY } from '../../../domain/repositories/academico-repository.token';
import { ICursoRepository } from '../../../domain/repositories/curso.repository.interface';

@Injectable()
export class DeleteCursoUseCase {
  constructor(
    @Inject(CURSO_REPOSITORY)
    private readonly cursoRepository: ICursoRepository,
  ) {}

  async execute(id: number, institucionId: number): Promise<void> {
    const curso = await this.cursoRepository.findById(id, institucionId);

    if (!curso) {
      throw new NotFoundException(`Curso con ID ${id} no encontrado`);
    }

    return this.cursoRepository.remove(id, institucionId);
  }
}
