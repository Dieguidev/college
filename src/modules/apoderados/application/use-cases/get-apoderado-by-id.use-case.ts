// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\apoderados\application\use-cases\get-apoderado-by-id.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Apoderado } from '../../domain/entities';
import { APODERADOS_REPOSITORY } from '../../domain/repositories/apoderados-repository.token';
import { IApoderadosRepository } from '../../domain/repositories/apoderados.repository.interface';

@Injectable()
export class GetApoderadoByIdUseCase {
  constructor(
    @Inject(APODERADOS_REPOSITORY)
    private readonly apoderadosRepository: IApoderadosRepository,
  ) {}

  async execute(id: number, institucionId: number): Promise<Apoderado> {
    const apoderado = await this.apoderadosRepository.findById(
      id,
      institucionId,
    );
    if (!apoderado) {
      throw new NotFoundException(`Apoderado con ID ${id} no encontrado`);
    }
    return apoderado;
  }
}
