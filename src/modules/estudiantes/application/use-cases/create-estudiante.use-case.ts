import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateEstudianteDto } from '../dto';
import { IEstudiantesRepository } from '../../domain/repositories/estudiantes.repository.interface';
import { ESTUDIANTES_REPOSITORY } from '../../domain/repositories/estudiantes-repository.token';

@Injectable()
export class CreateEstudianteUseCase {
  constructor(
    @Inject(ESTUDIANTES_REPOSITORY)
    private readonly estudiantesRepository: IEstudiantesRepository,
  ) {}

  async execute(createEstudianteDto: CreateEstudianteDto) {
    try {
      const { institucionId } = createEstudianteDto;

      // Verificar si ya existe un estudiante con el mismo DNI
      const existingEstudiante = await this.estudiantesRepository.findByDni(
        createEstudianteDto.dni,
        institucionId,
      );

      if (existingEstudiante) {
        throw new BadRequestException(
          `Ya existe un estudiante con el DNI ${createEstudianteDto.dni} en esta institución`,
        );
      }

      // Crear el estudiante
      const estudiante = await this.estudiantesRepository.create(
        createEstudianteDto,
        institucionId,
      );

      return {
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
      };
    } catch (error) {
      // Manejar errores específicos de Prisma
      if (error.code === 'P2002') {
        if (error.meta?.target?.includes('dni')) {
          throw new BadRequestException(
            `Ya existe un estudiante con el DNI ${createEstudianteDto.dni}`,
          );
        }
        if (error.meta?.target?.includes('email')) {
          throw new BadRequestException(
            `El correo electrónico ${createEstudianteDto.email} ya está en uso`,
          );
        }
        throw new BadRequestException('Ya existe un registro con esos datos');
      }

      // Si no es un error que ya estemos manejando explícitamente, lo propagamos
      if (error instanceof BadRequestException) {
        throw error;
      }

      console.error(error);
      throw new InternalServerErrorException(
        'Ocurrió un error al crear el estudiante',
      );
    }
  }
}
