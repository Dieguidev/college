import { applyDecorators, Param } from '@nestjs/common';
import {
  ApiParam,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { InstitucionAuth } from '../institucion-auth.decorator';

/**
 * Decorador combinado para documentación Swagger de endpoints que usan InstitucionAuth
 *
 * NOTA: Este decorador NO reemplaza el uso de InstitucionAuth en el parámetro.
 * Debes usar este decorador a nivel de método, y usar InstitucionAuth() a nivel de parámetro.
 *
 * @example
 * ```typescript
 * @Get(':institucionId/stats')
 * @Auth(Role.SUPER_ADMIN, Role.ADMIN)
 * @InstitucionAuthDocumentation() // <-- Este decorador
 * async getStats(@InstitucionAuth() institucionId: number) { // <-- Sigue necesitando este
 *   // ...
 * }
 * ```
 */
export const InstitucionAuthDocumentation = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiParam({
      name: 'institucionId',
      type: Number,
      description: 'ID de la institución a la que se intenta acceder',
      required: true,
    }),
    ApiUnauthorizedResponse({
      description: 'No autorizado - Se requiere autenticación',
    }),
    ApiForbiddenResponse({
      description:
        'Prohibido - No tienes permiso para acceder a esta institución',
    }),
  );
};
