import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { Role } from '../../../auth/domain/value-objects';
import { JwtPayload } from '../../../auth/presentation/controllers/interfaces/jwt-payload.interface';

/**
 * Decorador para extraer el ID de la institución de los parámetros de la ruta,
 * y autorizar el acceso basado en la pertenencia del usuario a dicha institución.
 *
 * Funciones:
 * 1. Extrae y valida el ID de institución de los parámetros de la ruta
 * 2. Verifica que el usuario actual tenga permiso para acceder a esta institución
 * 3. Permite acceso al SUPER_ADMIN independientemente de la institución
 * 4. Lanza ForbiddenException si el usuario intenta acceder a una institución diferente a la suya
 */
export const InstitucionAuth = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): number => {
    const request: Request = ctx.switchToHttp().getRequest();

    // Extraer el ID de la institución del parámetro de ruta
    const institucionId = request.params.institucionId;
    const id = parseInt(institucionId, 10);
    if (isNaN(id)) {
      throw new Error('El ID de institución no es válido');
    }

    // Validar que el usuario tenga permiso para acceder a esta institución
    const user = request.user as JwtPayload | undefined;
    if (user) {
      // El SUPER_ADMIN puede acceder a cualquier institución
      if (user.rol === Role.SUPER_ADMIN) {
        return id;
      }

      // Para otros roles, verificar que pertenezcan a la institución
      if (user.institucionId !== id) {
        throw new ForbiddenException(
          'No tienes permiso para acceder a esta institución',
        );
      }
    }

    return id;
  },
);
