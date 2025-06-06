export class Institucion {
  id?: number; // Hacemos que id sea opcional
  nombre: string;
  ruc: string;
  direccion: string;
  telefono?: string;
  email?: string;
  sitioWeb?: string;
  logo?: string;
  colorPrimario?: string;
  colorSecundario?: string;
  estado: boolean;
  fechaCreacion: Date;
  adminId?: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
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
    this.id = data.id;
    this.nombre = data.nombre;
    this.ruc = data.ruc;
    this.direccion = data.direccion;
    this.telefono = data.telefono;
    this.email = data.email;
    this.sitioWeb = data.sitioWeb;
    this.logo = data.logo;
    this.colorPrimario = data.colorPrimario;
    this.colorSecundario = data.colorSecundario;
    this.estado = data.estado ?? true;
    this.fechaCreacion = data.fechaCreacion ?? new Date();
    this.adminId = data.adminId;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }
}
