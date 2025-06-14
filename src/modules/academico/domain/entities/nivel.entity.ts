// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\domain\entities\nivel.entity.ts
export class Nivel {
  readonly id: number | undefined;
  readonly nombre: string;
  readonly descripcion?: string;
  readonly institucionId: number;
  readonly createdAt: Date | undefined;
  readonly updatedAt: Date | undefined;

  constructor(props: {
    id?: number;
    nombre: string;
    descripcion?: string;
    institucionId: number;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id;
    this.nombre = props.nombre;
    this.descripcion = props.descripcion;
    this.institucionId = props.institucionId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
