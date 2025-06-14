// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\use-cases\anio-academico\create-anio-academico.use-case.ts
import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { AnioAcademico } from '../../../domain/entities';
import { ANIO_ACADEMICO_REPOSITORY } from '../../../domain/repositories/academico-repository.token';
import { IAnioAcademicoRepository } from '../../../domain/repositories/anio-academico.repository.interface';
import { CreateAnioAcademicoDto } from '../../dto';

@Injectable()
export class CreateAnioAcademicoUseCase {
  constructor(
    @Inject(ANIO_ACADEMICO_REPOSITORY)
    private readonly anioAcademicoRepository: IAnioAcademicoRepository,
  ) {}

  async execute(
    createAnioAcademicoDto: CreateAnioAcademicoDto,
    institucionId: number,
  ): Promise<AnioAcademico> {
    // Validamos que la fecha de inicio sea anterior a la fecha de fin
    if (createAnioAcademicoDto.fechaInicio >= createAnioAcademicoDto.fechaFin) {
      throw new BadRequestException(
        'La fecha de inicio debe ser anterior a la fecha de fin',
      );
    }

    const data: Partial<AnioAcademico> = {
      nombre: createAnioAcademicoDto.nombre,
      fechaInicio: createAnioAcademicoDto.fechaInicio,
      fechaFin: createAnioAcademicoDto.fechaFin,
      activo: createAnioAcademicoDto.activo || false,
      institucionId,
    };

    return this.anioAcademicoRepository.create(data);
  }
}
