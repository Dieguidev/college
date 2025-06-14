// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\horarios\application\use-cases\horario\get-all-horarios.use-case.ts
import { Injectable, Inject } from '@nestjs/common';
import { HORARIO_REPOSITORY } from '../../../domain/repositories/horarios-repository.token';
import { HorarioRepositoryInterface } from '../../../domain/repositories/horario.repository.interface';
import { Horario } from '../../../domain/entities/horario.entity';

@Injectable()
export class GetAllHorariosUseCase {
  constructor(
    @Inject(HORARIO_REPOSITORY)
    private readonly horarioRepository: HorarioRepositoryInterface,
  ) {}

  async execute(institucionId: number): Promise<Horario[]> {
    return this.horarioRepository.findAll(institucionId);
  }
}
