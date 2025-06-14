// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\domain\entities\grado.entity.ts
export class Grado {
  readonly id: number | undefined;
  readonly nombre: string;
  readonly nivelId: number;
  readonly anioAcademicoId: number;
  readonly descripcion?: string;
  readonly institucionId: number;
  readonly createdAt: Date | undefined;
  readonly updatedAt: Date | undefined;

  constructor(props: {
    id?: number;
    nombre: string;
    nivelId: number;
    anioAcademicoId: number;
    descripcion?: string;
    institucionId: number;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id;
    this.nombre = props.nombre;
    this.nivelId = props.nivelId;
    this.anioAcademicoId = props.anioAcademicoId;
    this.descripcion = props.descripcion;
    this.institucionId = props.institucionId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  getNombreCompleto(): string {
    return this.nombre;
  }
}
