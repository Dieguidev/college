// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\evaluaciones\domain\entities\evaluacion.entity.ts
export class Evaluacion {
  id: number;
  titulo: string;
  descripcion?: string;
  claseId: number;
  tipoEvaluacionId: number;
  periodoAcademicoId: number;
  fecha: Date;
  puntajeMaximo: number;
  publicada: boolean;
  institucionId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  constructor(partial: Partial<Evaluacion>) {
    Object.assign(this, partial);
  }
}
