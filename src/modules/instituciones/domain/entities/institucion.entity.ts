export class Institucion {
  readonly id: number | undefined;
  readonly nombre: string;
  readonly ruc: string;
  readonly direccion: string;
  readonly telefono?: string;
  readonly email?: string;
  readonly sitioWeb?: string;
  readonly logo?: string;
  readonly colorPrimario?: string;
  readonly colorSecundario?: string;
  readonly estado: boolean;
  readonly fechaCreacion: Date | undefined;
  readonly adminId?: number;
  readonly createdAt: Date | undefined;
  readonly updatedAt: Date | undefined;

  constructor(props: {
    id?: number;
    nombre: string;
    ruc: string;
    direccion: string;
    telefono?: string;
    email?: string;
    sitioWeb?: string;
    logo?: string;
    colorPrimario?: string;
    colorSecundario?: string;
    estado?: boolean;
    fechaCreacion?: Date;
    adminId?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id;
    this.nombre = props.nombre;
    this.ruc = props.ruc;
    this.direccion = props.direccion;
    this.telefono = props.telefono;
    this.email = props.email;
    this.sitioWeb = props.sitioWeb;
    this.logo = props.logo;
    this.colorPrimario = props.colorPrimario;
    this.colorSecundario = props.colorSecundario;
    this.estado = props.estado ?? true;
    this.fechaCreacion = props.fechaCreacion;
    this.adminId = props.adminId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
