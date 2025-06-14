import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../domain/value-objects/role.value-object';

/**
 * DTO para la respuesta de autenticación en Swagger
 */
export class AuthResponseDto {
  @ApiProperty({
    description: 'Token JWT de autenticación',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  token: string;

  @ApiProperty({
    description: 'ID del usuario',
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'Nombre de usuario',
    example: 'usuario.ejemplo',
  })
  username: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'usuario@ejemplo.com',
  })
  email: string;

  @ApiProperty({
    description: 'Rol del usuario en el sistema',
    example: Role.ESTUDIANTE,
    enum: Role,
  })
  rol: Role;

  @ApiProperty({
    description: 'ID de la institución a la que pertenece el usuario',
    example: 1,
    type: Number,
  })
  institucionId: number;
}
