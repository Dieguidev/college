// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\evaluaciones\domain\entities\tipo-evaluacion.entity.ts
export class TipoEvaluacion {
  id: number;
  nombre: string;
  descripcion?: string;
  peso: number; // Peso porcentual para cálculos (ej: 20%)
  institucionId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  constructor(partial: Partial<TipoEvaluacion>) {
    Object.assign(this, partial);
  }
}
