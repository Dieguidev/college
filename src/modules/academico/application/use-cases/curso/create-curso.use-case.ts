// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\curso\create-curso.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { Curso } from '../../../domain/entities';
import { CURSO_REPOSITORY } from '../../../domain/repositories/academico-repository.token';
import { ICursoRepository } from '../../../domain/repositories/curso.repository.interface';
import { CreateCursoDto } from '../../dto';

@Injectable()
export class CreateCursoUseCase {
  constructor(
    @Inject(CURSO_REPOSITORY)
    private readonly cursoRepository: ICursoRepository,
  ) {}

  async execute(
    createCursoDto: CreateCursoDto,
    institucionId: number,
  ): Promise<Curso> {
    const data: Partial<Curso> = {
      nombre: createCursoDto.nombre,
      descripcion: createCursoDto.descripcion,
      codigoInterno: createCursoDto.codigoInterno,
      institucionId,
    };

    return this.cursoRepository.create(data);
  }
}
