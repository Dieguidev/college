// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\estudiante-grado\matricular-estudiante.use-case.ts
import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { EstudianteGrado } from '../../../domain/entities';
import {
  ESTUDIANTE_GRADO_REPOSITORY,
  GRADO_REPOSITORY,
} from '../../../domain/repositories/academico-repository.token';
import { IEstudianteGradoRepository } from '../../../domain/repositories/estudiante-grado.repository.interface';
import { IGradoRepository } from '../../../domain/repositories/grado.repository.interface';
import { MatricularEstudianteDto } from '../../dto';

@Injectable()
export class MatricularEstudianteUseCase {
  constructor(
    @Inject(ESTUDIANTE_GRADO_REPOSITORY)
    private readonly estudianteGradoRepository: IEstudianteGradoRepository,
    @Inject(GRADO_REPOSITORY)
    private readonly gradoRepository: IGradoRepository,
  ) {}

  async execute(
    matricularEstudianteDto: MatricularEstudianteDto,
    institucionId: number,
  ): Promise<EstudianteGrado> {
    // Verificamos que exista el grado
    const grado = await this.gradoRepository.findById(
      matricularEstudianteDto.gradoId,
      institucionId,
    );

    if (!grado) {
      throw new NotFoundException(
        `Grado con ID ${matricularEstudianteDto.gradoId} no encontrado`,
      );
    }

    // Verificamos si el estudiante ya está matriculado en algún grado de este año académico
    const matriculasExistentes =
      await this.estudianteGradoRepository.findByEstudiante(
        matricularEstudianteDto.estudianteId,
        institucionId,
      );

    const yaMatriculadoEnMismoAnio = matriculasExistentes.some(
      async (matricula) => {
        const gradoMatricula = await this.gradoRepository.findById(
          matricula.gradoId,
          institucionId,
        );
        return (
          gradoMatricula &&
          gradoMatricula.anioAcademicoId === grado.anioAcademicoId
        );
      },
    );

    if (yaMatriculadoEnMismoAnio) {
      throw new BadRequestException(
        'El estudiante ya está matriculado en un grado de este año académico',
      );
    }

    return this.estudianteGradoRepository.matricularEstudiante(
      matricularEstudianteDto.estudianteId,
      matricularEstudianteDto.gradoId,
      matricularEstudianteDto.seccion || 'A',
      institucionId,
    );
  }
}
