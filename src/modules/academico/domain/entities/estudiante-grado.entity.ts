// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\domain\entities\estudiante-grado.entity.ts
export class EstudianteGrado {
  readonly id: number | undefined;
  readonly estudianteId: number;
  readonly gradoId: number;
  readonly seccion?: string;
  readonly institucionId: number;
  readonly createdAt: Date | undefined;
  readonly updatedAt: Date | undefined;

  constructor(props: {
    id?: number;
    estudianteId: number;
    gradoId: number;
    seccion?: string;
    institucionId: number;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id;
    this.estudianteId = props.estudianteId;
    this.gradoId = props.gradoId;
    this.seccion = props.seccion;
    this.institucionId = props.institucionId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
