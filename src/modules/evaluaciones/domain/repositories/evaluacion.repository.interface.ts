// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\evaluaciones\domain\repositories\evaluacion.repository.interface.ts
import { Evaluacion } from '../entities/evaluacion.entity';

export interface EvaluacionRepositoryInterface {
  create(
    evaluacion: Partial<Evaluacion>,
    institucionId: number,
  ): Promise<Evaluacion>;
  findAll(institucionId: number): Promise<Evaluacion[]>;
  findById(id: number, institucionId: number): Promise<Evaluacion | null>;
  findByClase(claseId: number, institucionId: number): Promise<Evaluacion[]>;
  findByPeriodoAcademico(
    periodoAcademicoId: number,
    institucionId: number,
  ): Promise<Evaluacion[]>;
  findByTipoEvaluacion(
    tipoEvaluacionId: number,
    institucionId: number,
  ): Promise<Evaluacion[]>;
  findByRangoFechas(
    fechaInicio: Date,
    fechaFin: Date,
    institucionId: number,
  ): Promise<Evaluacion[]>;
  update(
    id: number,
    evaluacion: Partial<Evaluacion>,
    institucionId: number,
  ): Promise<Evaluacion>;
  delete(id: number, institucionId: number): Promise<Evaluacion>;
  publicar(id: number, institucionId: number): Promise<Evaluacion>;
  despublicar(id: number, institucionId: number): Promise<Evaluacion>;
}
