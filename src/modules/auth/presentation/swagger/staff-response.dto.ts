import { ApiProperty } from '@nestjs/swagger';
import { Genero } from '@prisma/client';
import { Role } from '../../domain/value-objects/role.value-object';

/**
 * DTO para la respuesta de creación de staff en Swagger
 */
export class StaffResponseDto {
  @ApiProperty({
    description: 'ID del miembro del staff',
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'Documento de identidad',
    example: '12345678',
  })
  dni: string;

  @ApiProperty({
    description: 'Nombres del miembro del staff',
    example: 'Ana María',
  })
  nombres: string;

  @ApiProperty({
    description: 'Apellidos del miembro del staff',
    example: 'López Mendoza',
  })
  apellidos: string;

  @ApiProperty({
    description: 'Fecha de nacimiento',
    example: '1985-05-20T00:00:00.000Z',
    type: Date,
  })
  fechaNacimiento: Date;

  @ApiProperty({
    description: 'Género del miembro del staff',
    example: Genero.FEMENINO,
    enum: Genero,
  })
  genero: Genero;

  @ApiProperty({
    description: 'Correo electrónico',
    example: 'ana.lopez@ejemplo.com',
  })
  email: string;

  @ApiProperty({
    description: 'Nombre de usuario para acceso al sistema',
    example: 'ana.lopez',
  })
  username: string;

  @ApiProperty({
    description: 'Rol del miembro del staff en el sistema',
    example: Role.PROFESOR,
    enum: Role,
  })
  rol: Role;

  @ApiProperty({
    description: 'ID de la institución a la que pertenece',
    example: 1,
    type: Number,
  })
  institucionId: number;
}
