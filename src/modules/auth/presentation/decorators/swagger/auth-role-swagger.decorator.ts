import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

/**
 * Decorador para documentar endpoints protegidos por roles en el módulo de autenticación
 * Agrega los decoradores de Swagger para la autenticación con JWT y las respuestas de error
 */
export function AuthRoleDocumentation() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiUnauthorizedResponse({
      description: 'No autorizado - Token inválido o expirado',
    }),
    ApiForbiddenResponse({
      description: 'Prohibido - No tiene los permisos de rol necesarios',
    }),
  );
}
