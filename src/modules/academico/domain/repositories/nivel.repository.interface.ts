// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\domain\repositories\nivel.repository.interface.ts
import { Nivel } from '../entities';

export interface INivelRepository {
  findAll(institucionId: number): Promise<Nivel[]>;
  findById(id: number, institucionId: number): Promise<Nivel | null>;
  create(data: Partial<Nivel>): Promise<Nivel>;
  update(
    id: number,
    data: Partial<Nivel>,
    institucionId: number,
  ): Promise<Nivel>;
  remove(id: number, institucionId: number): Promise<void>;
}
