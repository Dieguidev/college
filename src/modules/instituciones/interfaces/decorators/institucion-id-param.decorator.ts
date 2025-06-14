import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

/**
 * Decorador que extrae el ID de institución de los parámetros de la ruta.
 * Se utiliza en controladores que requieren el ID de la institución como parte de su ruta.
 * @example
 * // Uso del decorador en un método del controlador:
 * findOne(@InstitucionIdParam() institucionId: number) {
 *   // ...lógica que usa el institucionId
 * }
 */
export const InstitucionIdParam = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): number => {
    const request: Request = ctx.switchToHttp().getRequest();
    const institucionId = request.params.institucionId;

    // Convertir a número y verificar que es un valor válido
    const id = parseInt(institucionId, 10);

    if (isNaN(id)) {
      throw new Error('El ID de institución no es válido');
    }

    return id;
  },
);
