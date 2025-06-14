import { TipoParentesco } from '@prisma/client';

export class ApoderadoEstudiante {
  id?: number;
  apoderadoId: number;
  estudianteId: number;
  parentesco: TipoParentesco;
  esPrincipal: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
    id?: number;
    apoderadoId: number;
    estudianteId: number;
    parentesco: TipoParentesco;
    esPrincipal?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = data.id;
    this.apoderadoId = data.apoderadoId;
    this.estudianteId = data.estudianteId;
    this.parentesco = data.parentesco;
    this.esPrincipal = data.esPrincipal ?? false;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }
}
