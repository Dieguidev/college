// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\horarios\application\use-cases\horario\update-horario.use-case.ts
import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { HORARIO_REPOSITORY } from '../../../domain/repositories/horarios-repository.token';
import { HorarioRepositoryInterface } from '../../../domain/repositories/horario.repository.interface';
import { UpdateHorarioDto } from '../../dto/update-horario.dto';
import { Horario } from '../../../domain/entities/horario.entity';

@Injectable()
export class UpdateHorarioUseCase {
  constructor(
    @Inject(HORARIO_REPOSITORY)
    private readonly horarioRepository: HorarioRepositoryInterface,
  ) {}

  async execute(
    id: number,
    updateHorarioDto: UpdateHorarioDto,
    institucionId: number,
  ): Promise<Horario> {
    // Verificar que el horario existe
    const horario = await this.horarioRepository.findById(id, institucionId);
    if (!horario) {
      throw new NotFoundException(`Horario con ID ${id} no encontrado`);
    }

    // Validar hora de inicio y fin si se están actualizando
    if (updateHorarioDto.horaInicio || updateHorarioDto.horaFin) {
      const horaInicio = this.parseHora(
        updateHorarioDto.horaInicio || horario.horaInicio,
      );
      const horaFin = this.parseHora(
        updateHorarioDto.horaFin || horario.horaFin,
      );

      if (isNaN(horaInicio) || isNaN(horaFin)) {
        throw new BadRequestException('El formato de hora debe ser HH:MM');
      }

      if (horaInicio >= horaFin) {
        throw new BadRequestException(
          'La hora de inicio debe ser anterior a la hora de fin',
        );
      }
    }

    // Actualizar el horario
    return this.horarioRepository.update(id, updateHorarioDto, institucionId);
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
