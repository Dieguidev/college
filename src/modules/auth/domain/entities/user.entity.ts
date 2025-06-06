import { Role } from '../value-objects/role.value-object';

export class User {
  id: number;
  username: string;
  password: string;
  personalId?: number;
  estudianteId?: number;
  rol: Role;
  estado: boolean;
  ultimoAcceso?: Date;
  institucionId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
    this.estado = user.estado ?? true;
    this.createdAt = user.createdAt ?? new Date();
    this.updatedAt = user.updatedAt ?? new Date();
  }
}
