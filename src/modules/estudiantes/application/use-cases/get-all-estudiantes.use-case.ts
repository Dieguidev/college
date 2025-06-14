import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IEstudiantesRepository } from '../../domain/repositories/estudiantes.repository.interface';
import { ESTUDIANTES_REPOSITORY } from '../../domain/repositories/estudiantes-repository.token';

@Injectable()
export class GetAllEstudiantesUseCase {
  constructor(
    @Inject(ESTUDIANTES_REPOSITORY)
    private readonly estudiantesRepository: IEstudiantesRepository,
  ) {}

  async execute(institucionId: number) {
    try {
      const estudiantesList =
        await this.estudiantesRepository.findAll(institucionId);

      return estudiantesList.map((estudiante) => ({
        id: estudiante.id,
        dni: estudiante.dni,
        nombres: estudiante.nombres,
        apellidos: estudiante.apellidos,
        nombreCompleto: estudiante.nombreCompleto,
        fechaNacimiento: estudiante.fechaNacimiento,
        genero: estudiante.genero,
        email: estudiante.email,
        telefono: estudiante.telefono,
        estado: estudiante.estado,
        fechaIngreso: estudiante.fechaIngreso,
        institucionId: estudiante.institucionId,
      }));
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Ocurrió un error al obtener los estudiantes',
      );
    }
  }
}
