export class Apoderado {
  id?: number;
  dni: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  email?: string;
  ocupacion?: string;
  direccion?: string;
  institucionId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
    id?: number;
    dni: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    email?: string;
    ocupacion?: string;
    direccion?: string;
    institucionId: number;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = data.id;
    this.dni = data.dni;
    this.nombres = data.nombres;
    this.apellidos = data.apellidos;
    this.telefono = data.telefono;
    this.email = data.email;
    this.ocupacion = data.ocupacion;
    this.direccion = data.direccion;
    this.institucionId = data.institucionId;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }

  // Métodos de dominio
  get nombreCompleto(): string {
    return `${this.nombres} ${this.apellidos}`;
  }
}
