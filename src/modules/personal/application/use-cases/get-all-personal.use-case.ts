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
export class GetAllPersonalUseCase {
  constructor(
    @Inject(PERSONAL_REPOSITORY)
    private readonly personalRepository: IPersonalRepository,
  ) {}

  async execute(institucionId: number) {
    try {
      const personalList = await this.personalRepository.findAll(institucionId);

      return personalList.map((personal) => ({
        id: personal.id,
        dni: personal.dni,
        nombres: personal.nombres,
        apellidos: personal.apellidos,
        nombreCompleto: personal.nombreCompleto,
        email: personal.email,
        telefono: personal.telefono,
        profesion: personal.profesion,
        estado: personal.estado,
        fechaContratacion: personal.fechaContratacion,
        institucionId: personal.institucionId,
      }));
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Ocurrió un error al obtener el personal',
      );
    }
  }
}
