// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\horarios\domain\entities\periodo-academico.entity.ts
export class PeriodoAcademico {
  id: number;
  nombre: string;
  fechaInicio: Date;
  fechaFin: Date;
  anioAcademicoId: number;
  institucionId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  constructor(partial: Partial<PeriodoAcademico>) {
    Object.assign(this, partial);
  }
}
