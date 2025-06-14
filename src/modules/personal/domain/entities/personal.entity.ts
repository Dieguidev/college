import { Genero, EstadoPersonal } from '@prisma/client';

export class Personal {
  id?: number;
  dni: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento: Date;
  genero: Genero;
  direccion?: string;
  telefono: string;
  email: string;
  profesion?: string;
  fechaContratacion: Date;
  estado: EstadoPersonal;
  institucionId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
    id?: number;
    dni: string;
    nombres: string;
    apellidos: string;
    fechaNacimiento: Date;
    genero: Genero;
    direccion?: string;
    telefono: string;
    email: string;
    profesion?: string;
    fechaContratacion?: Date;
    estado?: EstadoPersonal;
    institucionId: number;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = data.id;
    this.dni = data.dni;
    this.nombres = data.nombres;
    this.apellidos = data.apellidos;
    this.fechaNacimiento = data.fechaNacimiento;
    this.genero = data.genero;
    this.direccion = data.direccion;
    this.telefono = data.telefono;
    this.email = data.email;
    this.profesion = data.profesion;
    this.fechaContratacion = data.fechaContratacion ?? new Date();
    this.estado = data.estado ?? EstadoPersonal.ACTIVO;
    this.institucionId = data.institucionId;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }

  // Métodos de dominio
  get nombreCompleto(): string {
    return `${this.nombres} ${this.apellidos}`;
  }
}
