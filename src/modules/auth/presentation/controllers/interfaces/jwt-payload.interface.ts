import {
  Role,
  ValidRole,
} from '../../../domain/value-objects/role.value-object';

export interface JwtPayload {
  id: number;
  username: string;
  rol: Role;
  institucionId: number;
}

export { Role, ValidRole };
