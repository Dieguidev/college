// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\domain\entities\anio-academico.entity.ts
export class AnioAcademico {
  readonly id: number | undefined;
  readonly nombre: string;
  readonly fechaInicio: Date;
  readonly fechaFin: Date;
  readonly activo: boolean;
  readonly institucionId: number;
  readonly createdAt: Date | undefined;
  readonly updatedAt: Date | undefined;

  constructor(props: {
    id?: number;
    nombre: string;
    fechaInicio: Date;
    fechaFin: Date;
    activo?: boolean;
    institucionId: number;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id;
    this.nombre = props.nombre;
    this.fechaInicio = props.fechaInicio;
    this.fechaFin = props.fechaFin;
    this.activo = props.activo ?? false;
    this.institucionId = props.institucionId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  estaActivo(): boolean {
    return this.activo;
  }
}
