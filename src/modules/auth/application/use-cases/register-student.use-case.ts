import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateStudentDto } from '../dto';
import { AuthRepository } from '../../infrastructure/repositories/auth.repository';

@Injectable()
export class RegisterStudentUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(createStudentDto: CreateStudentDto, institucionId: number) {
    try {
      // Registrar al estudiante
      const user = await this.authRepository.registerStudent(
        createStudentDto,
        institucionId,
      );

      return {
        id: user.id,
        username: user.username,
        estudianteId: user.estudianteId,
        rol: user.rol,
        institucionId: user.institucionId,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException(
          `El estudiante con DNI ${createStudentDto.dni} ya existe`,
        );
      }

      console.error(error);
      throw new InternalServerErrorException(
        'Ocurrió un error al registrar al estudiante',
      );
    }
  }
}
