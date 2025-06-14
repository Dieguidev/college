import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateInstitucionDto {
  @ApiPropertyOptional({
    description: 'Nombre de la institución',
    example: 'Universidad Nacional Mayor de San Marcos',
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  nombre?: string;

  @ApiPropertyOptional({
    description: 'Dirección física de la institución',
    example: 'Av. Universitaria s/n. cruce con Av. Venezuela cdra. 34 Lima',
  })
  @IsOptional()
  @IsString({ message: 'La dirección debe ser una cadena de texto' })
  direccion?: string;

  @ApiPropertyOptional({
    description: 'Número de teléfono de contacto',
    example: '(01) 619-7000',
  })
  @IsOptional()
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  telefono?: string;
  @ApiPropertyOptional({
    description: 'Correo electrónico institucional',
    example: 'contacto@unmsm.edu.pe',
  })
  @IsOptional()
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  email?: string;

  @ApiPropertyOptional({
    description: 'URL del sitio web institucional',
    example: 'https://www.unmsm.edu.pe',
  })
  @IsOptional()
  @IsString({ message: 'El sitio web debe ser una cadena de texto' })
  sitioWeb?: string;

  @ApiPropertyOptional({
    description: 'URL del logo de la institución',
    example: 'https://example.com/logo.png',
  })
  @IsOptional()
  @IsString({ message: 'El logo debe ser una cadena de texto' })
  logo?: string;
  @ApiPropertyOptional({
    description: 'Color primario en formato hexadecimal',
    example: '#1A2B3C',
  })
  @IsOptional()
  @IsString({ message: 'El color primario debe ser una cadena de texto' })
  @Matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: 'El color primario debe ser un color hexadecimal válido',
  })
  colorPrimario?: string;

  @ApiPropertyOptional({
    description: 'Color secundario en formato hexadecimal',
    example: '#4D5E6F',
  })
  @IsOptional()
  @IsString({ message: 'El color secundario debe ser una cadena de texto' })
  @Matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: 'El color secundario debe ser un color hexadecimal válido',
  })
  colorSecundario?: string;

  @ApiPropertyOptional({
    description: 'Estado de la institución (activa/inactiva)',
    example: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'El estado debe ser un booleano' })
  estado?: boolean;
}
