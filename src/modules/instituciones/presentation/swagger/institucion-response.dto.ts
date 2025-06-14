import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO para la respuesta de Institución en Swagger
 */
export class InstitucionResponseDto {
  @ApiProperty({
    description: 'ID único de la institución',
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'Nombre de la institución',
    example: 'Universidad Nacional Mayor de San Marcos',
    type: String,
  })
  nombre: string;

  @ApiProperty({
    description: 'RUC de la institución (11 dígitos)',
    example: '20148092282',
    type: String,
  })
  ruc: string;

  @ApiProperty({
    description: 'Dirección física de la institución',
    example: 'Av. Universitaria s/n. cruce con Av. Venezuela cdra. 34 Lima',
    type: String,
  })
  direccion: string;

  @ApiPropertyOptional({
    description: 'Número de teléfono de contacto',
    example: '(01) 619-7000',
    type: String,
  })
  telefono?: string;

  @ApiPropertyOptional({
    description: 'Correo electrónico institucional',
    example: 'contacto@unmsm.edu.pe',
    type: String,
  })
  email?: string;

  @ApiPropertyOptional({
    description: 'URL del sitio web institucional',
    example: 'https://www.unmsm.edu.pe',
    type: String,
  })
  sitioWeb?: string;

  @ApiPropertyOptional({
    description: 'URL del logo de la institución',
    example: 'https://example.com/logo.png',
    type: String,
  })
  logo?: string;

  @ApiPropertyOptional({
    description: 'Color primario en formato hexadecimal',
    example: '#1A2B3C',
    type: String,
  })
  colorPrimario?: string;

  @ApiPropertyOptional({
    description: 'Color secundario en formato hexadecimal',
    example: '#4D5E6F',
    type: String,
  })
  colorSecundario?: string;

  @ApiProperty({
    description: 'Estado de la institución (activa/inactiva)',
    example: true,
    type: Boolean,
  })
  estado: boolean;

  @ApiProperty({
    description: 'Fecha de fundación de la institución',
    example: '1995-05-12T00:00:00.000Z',
    type: Date,
  })
  fechaCreacion: Date;

  @ApiPropertyOptional({
    description: 'ID del administrador principal',
    example: 42,
    type: Number,
  })
  adminId?: number;

  @ApiProperty({
    description: 'Fecha de registro en el sistema',
    example: '2023-05-12T15:30:45.123Z',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización',
    example: '2023-06-15T10:20:30.456Z',
    type: Date,
  })
  updatedAt: Date;
}
