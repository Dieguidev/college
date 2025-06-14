// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\horarios\domain\repositories\horario.repository.interface.ts
import { Horario, DiaSemana } from '../entities/horario.entity';

export interface HorarioRepositoryInterface {
  create(horario: Partial<Horario>, institucionId: number): Promise<Horario>;
  findAll(institucionId: number): Promise<Horario[]>;
  findById(id: number, institucionId: number): Promise<Horario | null>;
  findByClase(claseId: number, institucionId: number): Promise<Horario[]>;
  findByDiaSemana(
    diaSemana: DiaSemana,
    institucionId: number,
  ): Promise<Horario[]>;
  update(
    id: number,
    horario: Partial<Horario>,
    institucionId: number,
  ): Promise<Horario>;
  delete(id: number, institucionId: number): Promise<Horario>;
  findHorariosByGrado(
    gradoId: number,
    institucionId: number,
  ): Promise<Horario[]>;
  findHorariosByProfesor(
    profesorId: number,
    institucionId: number,
  ): Promise<Horario[]>;
}
