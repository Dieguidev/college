import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IPersonalRepository } from '../../domain/repositories/personal.repository.interface';
import { PERSONAL_REPOSITORY } from '../../domain/repositories/personal-repository.token';

@Injectable()
export class DeletePersonalUseCase {
  constructor(
    @Inject(PERSONAL_REPOSITORY)
    private readonly personalRepository: IPersonalRepository,
  ) {}

  async execute(id: number, institucionId: number) {
    try {
      // Verificar si existe el miembro del personal
      const existingPersonal = await this.personalRepository.findById(
        id,
        institucionId,
      );

      if (!existingPersonal) {
        throw new NotFoundException(
          `No se encontró un miembro del personal con id ${id}`,
        );
      }

      // Eliminar el miembro del personal
      await this.personalRepository.remove(id, institucionId);

      return {
        message: `Miembro del personal con id ${id} eliminado correctamente`,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      console.error(error);
      throw new InternalServerErrorException(
        'Ocurrió un error al eliminar el miembro del personal',
      );
    }
  }
}
