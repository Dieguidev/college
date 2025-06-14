// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\domain\repositories\clase.repository.interface.ts
import { Clase } from '../entities';

export interface IClaseRepository {
  findAll(institucionId: number): Promise<Clase[]>;
  findById(id: number, institucionId: number): Promise<Clase | null>;
  findByGrado(gradoId: number, institucionId: number): Promise<Clase[]>;
  findByProfesor(personalId: number, institucionId: number): Promise<Clase[]>;
  findByCurso(cursoId: number, institucionId: number): Promise<Clase[]>;
  create(data: Partial<Clase>): Promise<Clase>;
  update(
    id: number,
    data: Partial<Clase>,
    institucionId: number,
  ): Promise<Clase>;
  remove(id: number, institucionId: number): Promise<void>;
}
