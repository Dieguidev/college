// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\apoderados\application\use-cases\get-all-apoderados.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { Apoderado } from '../../domain/entities';
import { APODERADOS_REPOSITORY } from '../../domain/repositories/apoderados-repository.token';
import { IApoderadosRepository } from '../../domain/repositories/apoderados.repository.interface';

@Injectable()
export class GetAllApoderadosUseCase {
  constructor(
    @Inject(APODERADOS_REPOSITORY)
    private readonly apoderadosRepository: IApoderadosRepository,
  ) {}

  async execute(institucionId: number): Promise<Apoderado[]> {
    return this.apoderadosRepository.findAll(institucionId);
  }
}
