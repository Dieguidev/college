// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\evaluaciones\domain\repositories\tipo-evaluacion.repository.interface.ts
import { TipoEvaluacion } from '../entities/tipo-evaluacion.entity';

export interface TipoEvaluacionRepositoryInterface {
  create(
    tipoEvaluacion: Partial<TipoEvaluacion>,
    institucionId: number,
  ): Promise<TipoEvaluacion>;
  findAll(institucionId: number): Promise<TipoEvaluacion[]>;
  findById(id: number, institucionId: number): Promise<TipoEvaluacion | null>;
  update(
    id: number,
    tipoEvaluacion: Partial<TipoEvaluacion>,
    institucionId: number,
  ): Promise<TipoEvaluacion>;
  delete(id: number, institucionId: number): Promise<TipoEvaluacion>;
}
