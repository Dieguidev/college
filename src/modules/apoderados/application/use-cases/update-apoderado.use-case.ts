// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\apoderados\application\use-cases\update-apoderado.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Apoderado } from '../../domain/entities';
import { APODERADOS_REPOSITORY } from '../../domain/repositories/apoderados-repository.token';
import { IApoderadosRepository } from '../../domain/repositories/apoderados.repository.interface';
import { UpdateApoderadoDto } from '../dto';

@Injectable()
export class UpdateApoderadoUseCase {
  constructor(
    @Inject(APODERADOS_REPOSITORY)
    private readonly apoderadosRepository: IApoderadosRepository,
  ) {}

  async execute(
    id: number,
    updateApoderadoDto: UpdateApoderadoDto,
    institucionId: number,
  ): Promise<Apoderado> {
    // Verificar si existe el apoderado
    const apoderadoExistente = await this.apoderadosRepository.findById(
      id,
      institucionId,
    );
    if (!apoderadoExistente) {
      throw new NotFoundException(`Apoderado con ID ${id} no encontrado`);
    }

    return this.apoderadosRepository.update(
      id,
      updateApoderadoDto,
      institucionId,
    );
  }
}
