import { Genero, EstadoEstudiante } from '@prisma/client';

export class Estudiante {
  id?: number;
  dni: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento: Date;
  genero: Genero;
  direccion?: string;
  telefono?: string;
  email?: string;
  fechaIngreso: Date;
  estado: EstadoEstudiante;
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
    telefono?: string;
    email?: string;
    fechaIngreso?: Date;
    estado?: EstadoEstudiante;
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
    this.fechaIngreso = data.fechaIngreso ?? new Date();
    this.estado = data.estado ?? EstadoEstudiante.ACTIVO;
    this.institucionId = data.institucionId;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }

  // Métodos de dominio
  get nombreCompleto(): string {
    return `${this.nombres} ${this.apellidos}`;
  }
}
