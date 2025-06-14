// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\evaluaciones\domain\entities\calificacion.entity.ts
export class Calificacion {
  id: number;
  evaluacionId: number;
  estudianteId: number;
  puntaje: number;
  nota: number;
  observaciones?: string;
  fechaRegistro: Date;
  institucionId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  constructor(partial: Partial<Calificacion>) {
    Object.assign(this, partial);
  }
}
