// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\domain\repositories\anio-academico.repository.interface.ts
import { AnioAcademico } from '../entities';

export interface IAnioAcademicoRepository {
  findAll(institucionId: number): Promise<AnioAcademico[]>;
  findById(id: number, institucionId: number): Promise<AnioAcademico | null>;
  findActiveYear(institucionId: number): Promise<AnioAcademico | null>;
  create(data: Partial<AnioAcademico>): Promise<AnioAcademico>;
  update(
    id: number,
    data: Partial<AnioAcademico>,
    institucionId: number,
  ): Promise<AnioAcademico>;
  remove(id: number, institucionId: number): Promise<void>;
  activateYear(id: number, institucionId: number): Promise<AnioAcademico>;
}
