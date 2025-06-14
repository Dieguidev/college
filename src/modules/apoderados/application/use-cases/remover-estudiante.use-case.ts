// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\apoderados\application\use-cases\remover-estudiante.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { APODERADOS_REPOSITORY } from '../../domain/repositories/apoderados-repository.token';
import { IApoderadosRepository } from '../../domain/repositories/apoderados.repository.interface';

@Injectable()
export class RemoverEstudianteUseCase {
  constructor(
    @Inject(APODERADOS_REPOSITORY)
    private readonly apoderadosRepository: IApoderadosRepository,
  ) {}

  async execute(
    apoderadoId: number,
    estudianteId: number,
    institucionId: number,
  ): Promise<void> {
    // Verificar si existe el apoderado
    const apoderadoExistente = await this.apoderadosRepository.findById(
      apoderadoId,
      institucionId,
    );
    if (!apoderadoExistente) {
      throw new NotFoundException(
        `Apoderado con ID ${apoderadoId} no encontrado`,
      );
    }

    return this.apoderadosRepository.removerEstudiante(
      apoderadoId,
      estudianteId,
    );
  }
}
