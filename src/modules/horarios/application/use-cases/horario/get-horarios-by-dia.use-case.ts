// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\horarios\application\use-cases\horario\get-horarios-by-dia.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { HORARIO_REPOSITORY } from '../../../domain/repositories/horarios-repository.token';
import { HorarioRepositoryInterface } from '../../../domain/repositories/horario.repository.interface';
import { Horario, DiaSemana } from '../../../domain/entities/horario.entity';

@Injectable()
export class GetHorariosByDiaUseCase {
  constructor(
    @Inject(HORARIO_REPOSITORY)
    private readonly horarioRepository: HorarioRepositoryInterface,
  ) {}

  async execute(
    diaSemana: DiaSemana,
    institucionId: number,
  ): Promise<Horario[]> {
    return this.horarioRepository.findByDiaSemana(diaSemana, institucionId);
  }
}
