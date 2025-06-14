// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\domain\repositories\curso.repository.interface.ts
import { Curso } from '../entities';

export interface ICursoRepository {
  findAll(institucionId: number): Promise<Curso[]>;
  findById(id: number, institucionId: number): Promise<Curso | null>;
  create(data: Partial<Curso>): Promise<Curso>;
  update(
    id: number,
    data: Partial<Curso>,
    institucionId: number,
  ): Promise<Curso>;
  remove(id: number, institucionId: number): Promise<void>;
}
