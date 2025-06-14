import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

/**
 * Decorador para extraer el ID de la institución de los parámetros de la ruta.
 * Convierte el ID a número y valida que sea un número válido.
 */
export const InstitucionIdParam = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): number => {
    const request: Request = ctx.switchToHttp().getRequest();
    const institucionId = request.params.institucionId;
    const id = parseInt(institucionId, 10);
    if (isNaN(id)) {
      throw new Error('El ID de institución no es válido');
    }
    return id;
  },
);
