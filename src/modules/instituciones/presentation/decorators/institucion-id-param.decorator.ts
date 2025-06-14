import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { Role } from '../../../auth/domain/value-objects';
import { JwtPayload } from '../../../auth/presentation/controllers/interfaces/jwt-payload.interface';

/**
 * Decorador para extraer el ID de la institución de los parámetros de la ruta.
 * Convierte el ID a número, valida que sea un número válido y verifica que el
 * usuario logueado pertenezca a esta institución (excepto SUPER_ADMIN que puede
 * acceder a cualquier institución).
 */
export const InstitucionIdParam = createParamDecorator(
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
