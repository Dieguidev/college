// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\apoderados\application\use-cases\get-estudiantes-por-apoderado.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { APODERADOS_REPOSITORY } from '../../domain/repositories/apoderados-repository.token';
import { IApoderadosRepository } from '../../domain/repositories/apoderados.repository.interface';

@Injectable()
export class GetEstudiantesPorApoderadoUseCase {
  constructor(
    @Inject(APODERADOS_REPOSITORY)
    private readonly apoderadosRepository: IApoderadosRepository,
  ) {}

  async execute(apoderadoId: number, institucionId: number): Promise<any[]> {
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

    return this.apoderadosRepository.getEstudiantesPorApoderado(
      apoderadoId,
      institucionId,
    );
  }
}
