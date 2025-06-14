import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IPersonalRepository } from '../../domain/repositories/personal.repository.interface';
import { PERSONAL_REPOSITORY } from '../../domain/repositories/personal-repository.token';

@Injectable()
export class GetPersonalByIdUseCase {
  constructor(
    @Inject(PERSONAL_REPOSITORY)
    private readonly personalRepository: IPersonalRepository,
  ) {}

  async execute(id: number, institucionId: number) {
    try {
      const personal = await this.personalRepository.findById(
        id,
        institucionId,
      );

      if (!personal) {
        throw new NotFoundException(
          `No se encontró un miembro del personal con id ${id}`,
        );
      }

      return {
        id: personal.id,
        dni: personal.dni,
        nombres: personal.nombres,
        apellidos: personal.apellidos,
        nombreCompleto: personal.nombreCompleto,
        fechaNacimiento: personal.fechaNacimiento,
        genero: personal.genero,
        direccion: personal.direccion,
        email: personal.email,
        telefono: personal.telefono,
        profesion: personal.profesion,
        estado: personal.estado,
        fechaContratacion: personal.fechaContratacion,
        institucionId: personal.institucionId,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      console.error(error);
      throw new InternalServerErrorException(
        'Ocurrió un error al obtener el miembro del personal',
      );
    }
  }
}
