// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\domain\repositories\grado.repository.interface.ts
import { Grado } from '../entities';

export interface IGradoRepository {
  findAll(institucionId: number): Promise<Grado[]>;
  findById(id: number, institucionId: number): Promise<Grado | null>;
  findByNivel(nivelId: number, institucionId: number): Promise<Grado[]>;
  findByAnioAcademico(
    anioAcademicoId: number,
    institucionId: number,
  ): Promise<Grado[]>;
  create(data: Partial<Grado>): Promise<Grado>;
  update(
    id: number,
    data: Partial<Grado>,
    institucionId: number,
  ): Promise<Grado>;
  remove(id: number, institucionId: number): Promise<void>;
}
