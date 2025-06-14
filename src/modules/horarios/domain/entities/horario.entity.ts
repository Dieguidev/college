// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\horarios\domain\entities\horario.entity.ts
export class Horario {
  id: number;
  claseId: number;
  diaSemana: DiaSemana;
  horaInicio: string;
  horaFin: string;
  institucionId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  constructor(partial: Partial<Horario>) {
    Object.assign(this, partial);
  }
}

export enum DiaSemana {
  LUNES = 'LUNES',
  MARTES = 'MARTES',
  MIERCOLES = 'MIERCOLES',
  JUEVES = 'JUEVES',
  VIERNES = 'VIERNES',
  SABADO = 'SABADO',
  DOMINGO = 'DOMINGO',
}
