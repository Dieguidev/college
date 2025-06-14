import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateEstudianteDto } from '../dto';
import { IEstudiantesRepository } from '../../domain/repositories/estudiantes.repository.interface';
import { ESTUDIANTES_REPOSITORY } from '../../domain/repositories/estudiantes-repository.token';

@Injectable()
export class UpdateEstudianteUseCase {
  constructor(
    @Inject(ESTUDIANTES_REPOSITORY)
    private readonly estudiantesRepository: IEstudiantesRepository,
  ) {}

  async execute(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    try {
      const { institucionId } = updateEstudianteDto;

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

      // Actualizar el estudiante
      const estudiante = await this.estudiantesRepository.update(
        id,
        updateEstudianteDto,
        institucionId,
      );

      return {
        id: estudiante.id,
        dni: estudiante.dni,
        nombres: estudiante.nombres,
        apellidos: estudiante.apellidos,
        nombreCompleto: estudiante.nombreCompleto,
        email: estudiante.email,
        telefono: estudiante.telefono,
        estado: estudiante.estado,
        fechaIngreso: estudiante.fechaIngreso,
        institucionId: estudiante.institucionId,
      };
    } catch (error) {
      // Manejar errores específicos de Prisma
      if (error.code === 'P2002') {
        if (error.meta?.target?.includes('email')) {
          throw new BadRequestException(
            `El correo electrónico ${updateEstudianteDto.email} ya está en uso`,
          );
        }
        throw new BadRequestException('Ya existe un registro con esos datos');
      }

      // Si no es un error que ya estemos manejando explícitamente, lo propagamos
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      console.error(error);
      throw new InternalServerErrorException(
        'Ocurrió un error al actualizar el estudiante',
      );
    }
  }
}
