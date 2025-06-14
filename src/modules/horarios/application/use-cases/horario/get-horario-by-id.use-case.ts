// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\horarios\application\use-cases\horario\get-horario-by-id.use-case.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { HORARIO_REPOSITORY } from '../../../domain/repositories/horarios-repository.token';
import { HorarioRepositoryInterface } from '../../../domain/repositories/horario.repository.interface';
import { Horario } from '../../../domain/entities/horario.entity';

@Injectable()
export class GetHorarioByIdUseCase {
  constructor(
    @Inject(HORARIO_REPOSITORY)
    private readonly horarioRepository: HorarioRepositoryInterface,
  ) {}

  async execute(id: number, institucionId: number): Promise<Horario> {
    const horario = await this.horarioRepository.findById(id, institucionId);
    if (!horario) {
      throw new NotFoundException(`Horario con ID ${id} no encontrado`);
    }
    return horario;
  }
}
