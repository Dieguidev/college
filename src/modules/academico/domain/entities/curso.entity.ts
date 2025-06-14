// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\domain\entities\curso.entity.ts
export class Curso {
  readonly id: number | undefined;
  readonly nombre: string;
  readonly descripcion?: string;
  readonly codigoInterno?: string;
  readonly institucionId: number;
  readonly createdAt: Date | undefined;
  readonly updatedAt: Date | undefined;

  constructor(props: {
    id?: number;
    nombre: string;
    descripcion?: string;
    codigoInterno?: string;
    institucionId: number;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id;
    this.nombre = props.nombre;
    this.descripcion = props.descripcion;
    this.codigoInterno = props.codigoInterno;
    this.institucionId = props.institucionId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
