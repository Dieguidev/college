// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\evaluaciones\domain\repositories\calificacion.repository.interface.ts
import { Calificacion } from '../entities/calificacion.entity';

export interface CalificacionRepositoryInterface {
  create(
    calificacion: Partial<Calificacion>,
    institucionId: number,
  ): Promise<Calificacion>;
  createMany(
    calificaciones: Partial<Calificacion>[],
    institucionId: number,
  ): Promise<number>;
  findAll(institucionId: number): Promise<Calificacion[]>;
  findById(id: number, institucionId: number): Promise<Calificacion | null>;
  findByEvaluacion(
    evaluacionId: number,
    institucionId: number,
  ): Promise<Calificacion[]>;
  findByEstudiante(
    estudianteId: number,
    institucionId: number,
  ): Promise<Calificacion[]>;
  findByEvaluacionYEstudiante(
    evaluacionId: number,
    estudianteId: number,
    institucionId: number,
  ): Promise<Calificacion | null>;
  update(
    id: number,
    calificacion: Partial<Calificacion>,
    institucionId: number,
  ): Promise<Calificacion>;
  updateMany(
    calificaciones: {
      id: number;
      puntaje: number;
      nota: number;
      observaciones?: string;
    }[],
    institucionId: number,
  ): Promise<number>;
  delete(id: number, institucionId: number): Promise<Calificacion>;
  getPromedioByEstudianteYClase(
    estudianteId: number,
    claseId: number,
    institucionId: number,
  ): Promise<number>;
  getPromedioByEstudianteYPeriodo(
    estudianteId: number,
    periodoAcademicoId: number,
    institucionId: number,
  ): Promise<number>;
}
