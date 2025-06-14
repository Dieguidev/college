// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\horarios\application\use-cases\horario\create-horario.use-case.ts
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { HORARIO_REPOSITORY } from '../../../domain/repositories/horarios-repository.token';
import { HorarioRepositoryInterface } from '../../../domain/repositories/horario.repository.interface';
import { CreateHorarioDto } from '../../dto/create-horario.dto';
import { Horario } from '../../../domain/entities/horario.entity';

@Injectable()
export class CreateHorarioUseCase {
  constructor(
    @Inject(HORARIO_REPOSITORY)
    private readonly horarioRepository: HorarioRepositoryInterface,
  ) {}

  async execute(
    createHorarioDto: CreateHorarioDto,
    institucionId: number,
  ): Promise<Horario> {
    // Validación de hora de inicio y fin
    const horaInicio = this.parseHora(createHorarioDto.horaInicio);
    const horaFin = this.parseHora(createHorarioDto.horaFin);

    if (isNaN(horaInicio) || isNaN(horaFin)) {
      throw new BadRequestException('El formato de hora debe ser HH:MM');
    }

    if (horaInicio >= horaFin) {
      throw new BadRequestException(
        'La hora de inicio debe ser anterior a la hora de fin',
      );
    }

    // Crear el horario
    return this.horarioRepository.create(createHorarioDto, institucionId);
  }

  private parseHora(horaString: string): number {
    const [horas, minutos] = horaString.split(':').map(Number);
    if (
      isNaN(horas) ||
      isNaN(minutos) ||
      horas < 0 ||
      horas > 23 ||
      minutos < 0 ||
      minutos > 59
    ) {
      return NaN;
    }
    return horas * 60 + minutos; // Convertir a minutos para fácil comparación
  }
}
