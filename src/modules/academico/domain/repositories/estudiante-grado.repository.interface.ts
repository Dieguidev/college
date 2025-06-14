// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\domain\repositories\estudiante-grado.repository.interface.ts
import { EstudianteGrado } from '../entities';

export interface IEstudianteGradoRepository {
  findAll(institucionId: number): Promise<EstudianteGrado[]>;
  findById(id: number, institucionId: number): Promise<EstudianteGrado | null>;
  findByEstudiante(
    estudianteId: number,
    institucionId: number,
  ): Promise<EstudianteGrado[]>;
  findByGrado(
    gradoId: number,
    institucionId: number,
  ): Promise<EstudianteGrado[]>;
  findEstudiantesEnGrado(
    gradoId: number,
    institucionId: number,
  ): Promise<any[]>;
  create(data: Partial<EstudianteGrado>): Promise<EstudianteGrado>;
  update(
    id: number,
    data: Partial<EstudianteGrado>,
    institucionId: number,
  ): Promise<EstudianteGrado>;
  remove(id: number, institucionId: number): Promise<void>;
  matricularEstudiante(
    estudianteId: number,
    gradoId: number,
    seccion: string,
    institucionId: number,
  ): Promise<EstudianteGrado>;
  desmatricularEstudiante(
    estudianteId: number,
    gradoId: number,
    institucionId: number,
  ): Promise<void>;
}
