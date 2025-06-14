import { ApiProperty } from '@nestjs/swagger';
import { Genero } from '@prisma/client';

/**
 * DTO para la respuesta de creación de estudiante en Swagger
 */
export class StudentResponseDto {
  @ApiProperty({
    description: 'ID del estudiante',
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
    description: 'Nombres del estudiante',
    example: 'Juan Carlos',
  })
  nombres: string;

  @ApiProperty({
    description: 'Apellidos del estudiante',
    example: 'Pérez García',
  })
  apellidos: string;

  @ApiProperty({
    description: 'Fecha de nacimiento',
    example: '2000-01-15T00:00:00.000Z',
    type: Date,
  })
  fechaNacimiento: Date;

  @ApiProperty({
    description: 'Género del estudiante',
    example: Genero.MASCULINO,
    enum: Genero,
  })
  genero: Genero;

  @ApiProperty({
    description: 'Correo electrónico',
    example: 'juan.perez@ejemplo.com',
  })
  email: string;

  @ApiProperty({
    description: 'Nombre de usuario para acceso al sistema',
    example: 'juan.perez',
  })
  username: string;

  @ApiProperty({
    description: 'ID de la institución a la que pertenece el estudiante',
    example: 1,
    type: Number,
  })
  institucionId: number;
}
