// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\clase\get-clases-by-curso.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Clase } from '../../../domain/entities';
import {
  CLASE_REPOSITORY,
  CURSO_REPOSITORY,
} from '../../../domain/repositories/academico-repository.token';
import { IClaseRepository } from '../../../domain/repositories/clase.repository.interface';
import { ICursoRepository } from '../../../domain/repositories/curso.repository.interface';

@Injectable()
export class GetClasesByCursoUseCase {
  constructor(
    @Inject(CLASE_REPOSITORY)
    private readonly claseRepository: IClaseRepository,
    @Inject(CURSO_REPOSITORY)
    private readonly cursoRepository: ICursoRepository,
  ) {}

  async execute(cursoId: number, institucionId: number): Promise<Clase[]> {
    // Verificamos que exista el curso
    const curso = await this.cursoRepository.findById(cursoId, institucionId);
    if (!curso) {
      throw new NotFoundException(`Curso con ID ${cursoId} no encontrado`);
    }

    return this.claseRepository.findByCurso(cursoId, institucionId);
  }
}
