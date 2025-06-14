import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IEstudiantesRepository } from '../../domain/repositories/estudiantes.repository.interface';
import { ESTUDIANTES_REPOSITORY } from '../../domain/repositories/estudiantes-repository.token';

@Injectable()
export class DeleteEstudianteUseCase {
  constructor(
    @Inject(ESTUDIANTES_REPOSITORY)
    private readonly estudiantesRepository: IEstudiantesRepository,
  ) {}

  async execute(id: number, institucionId: number) {
    try {
      // Verificar si existe el estudiante
      const existingEstudiante = await this.estudiantesRepository.findById(
        id,
        institucionId,
      );

      if (!existingEstudiante) {
        throw new NotFoundException(
          `No se encontró un estudiante con id ${id}`,
        );
      }

      // Eliminar el estudiante
      await this.estudiantesRepository.remove(id, institucionId);

      return { message: `Estudiante con id ${id} eliminado correctamente` };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      console.error(error);
      throw new InternalServerErrorException(
        'Ocurrió un error al eliminar el estudiante',
      );
    }
  }
}
