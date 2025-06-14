// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\horarios\domain\repositories\periodo-academico.repository.interface.ts
import { PeriodoAcademico } from '../entities/periodo-academico.entity';

export interface PeriodoAcademicoRepositoryInterface {
  create(
    periodoAcademico: Partial<PeriodoAcademico>,
    institucionId: number,
  ): Promise<PeriodoAcademico>;
  findAll(institucionId: number): Promise<PeriodoAcademico[]>;
  findById(id: number, institucionId: number): Promise<PeriodoAcademico | null>;
  findByAnioAcademico(
    anioAcademicoId: number,
    institucionId: number,
  ): Promise<PeriodoAcademico[]>;
  update(
    id: number,
    periodoAcademico: Partial<PeriodoAcademico>,
    institucionId: number,
  ): Promise<PeriodoAcademico>;
  delete(id: number, institucionId: number): Promise<PeriodoAcademico>;
  findCurrentPeriodo(institucionId: number): Promise<PeriodoAcademico | null>;
}
