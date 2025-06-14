import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IEstudiantesRepository } from '../../domain/repositories/estudiantes.repository.interface';
import { ESTUDIANTES_REPOSITORY } from '../../domain/repositories/estudiantes-repository.token';

@Injectable()
export class GetEstudianteByIdUseCase {
  constructor(
    @Inject(ESTUDIANTES_REPOSITORY)
    private readonly estudiantesRepository: IEstudiantesRepository,
  ) {}

  async execute(id: number, institucionId: number) {
    try {
      const estudiante = await this.estudiantesRepository.findById(
        id,
        institucionId,
      );

      if (!estudiante) {
        throw new NotFoundException(
          `No se encontró un estudiante con id ${id}`,
        );
      }

      return {
        id: estudiante.id,
        dni: estudiante.dni,
        nombres: estudiante.nombres,
        apellidos: estudiante.apellidos,
        nombreCompleto: estudiante.nombreCompleto,
        fechaNacimiento: estudiante.fechaNacimiento,
        genero: estudiante.genero,
        direccion: estudiante.direccion,
        email: estudiante.email,
        telefono: estudiante.telefono,
        estado: estudiante.estado,
        fechaIngreso: estudiante.fechaIngreso,
        institucionId: estudiante.institucionId,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      console.error(error);
      throw new InternalServerErrorException(
        'Ocurrió un error al obtener el estudiante',
      );
    }
  }
}
