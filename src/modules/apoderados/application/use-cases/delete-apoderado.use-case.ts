// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\apoderados\application\use-cases\delete-apoderado.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { APODERADOS_REPOSITORY } from '../../domain/repositories/apoderados-repository.token';
import { IApoderadosRepository } from '../../domain/repositories/apoderados.repository.interface';

@Injectable()
export class DeleteApoderadoUseCase {
  constructor(
    @Inject(APODERADOS_REPOSITORY)
    private readonly apoderadosRepository: IApoderadosRepository,
  ) {}

  async execute(id: number, institucionId: number): Promise<void> {
    // Verificar si existe el apoderado
    const apoderadoExistente = await this.apoderadosRepository.findById(
      id,
      institucionId,
    );
    if (!apoderadoExistente) {
      throw new NotFoundException(`Apoderado con ID ${id} no encontrado`);
    }

    return this.apoderadosRepository.remove(id, institucionId);
  }
}
