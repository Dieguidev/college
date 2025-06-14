// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\curso\get-all-cursos.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { Curso } from '../../../domain/entities';
import { CURSO_REPOSITORY } from '../../../domain/repositories/academico-repository.token';
import { ICursoRepository } from '../../../domain/repositories/curso.repository.interface';

@Injectable()
export class GetAllCursosUseCase {
  constructor(
    @Inject(CURSO_REPOSITORY)
    private readonly cursoRepository: ICursoRepository,
  ) {}

  async execute(institucionId: number): Promise<Curso[]> {
    return this.cursoRepository.findAll(institucionId);
  }
}
