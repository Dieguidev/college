// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\domain\entities\clase.entity.ts
export class Clase {
  readonly id: number | undefined;
  readonly cursoId: number;
  readonly gradoId: number;
  readonly personalId: number;
  readonly horasSemanales: number;
  readonly descripcion?: string;
  readonly institucionId: number;
  readonly createdAt: Date | undefined;
  readonly updatedAt: Date | undefined;

  constructor(props: {
    id?: number;
    cursoId: number;
    gradoId: number;
    personalId: number;
    horasSemanales: number;
    descripcion?: string;
    institucionId: number;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id;
    this.cursoId = props.cursoId;
    this.gradoId = props.gradoId;
    this.personalId = props.personalId;
    this.horasSemanales = props.horasSemanales;
    this.descripcion = props.descripcion;
    this.institucionId = props.institucionId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
