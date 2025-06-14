// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\anio-academico\delete-anio-academico.use-case.ts
import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ANIO_ACADEMICO_REPOSITORY } from '../../../domain/repositories/academico-repository.token';
import { IAnioAcademicoRepository } from '../../../domain/repositories/anio-academico.repository.interface';

@Injectable()
export class DeleteAnioAcademicoUseCase {
  constructor(
    @Inject(ANIO_ACADEMICO_REPOSITORY)
    private readonly anioAcademicoRepository: IAnioAcademicoRepository,
  ) {}

  async execute(id: number, institucionId: number): Promise<void> {
    const anioAcademico = await this.anioAcademicoRepository.findById(
      id,
      institucionId,
    );

    if (!anioAcademico) {
      throw new NotFoundException(`Año académico con ID ${id} no encontrado`);
    }

    // Validamos que no se elimine un año académico activo
    if (anioAcademico.estaActivo()) {
      throw new BadRequestException(
        'No se puede eliminar un año académico activo',
      );
    }

    return this.anioAcademicoRepository.remove(id, institucionId);
  }
}
