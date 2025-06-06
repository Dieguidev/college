import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateStudentDto } from '../dto';
import { IAuthRepository } from '../../domain/repositories/auth.repository.interface';
import { AUTH_REPOSITORY } from '../../domain/repositories/auth-repository.token';

@Injectable()
export class RegisterStudentUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
  ) {}

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
