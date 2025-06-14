import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateInstitucionDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  nombre: string;

  @IsNotEmpty({ message: 'El RUC es requerido' })
  @IsString({ message: 'El RUC debe ser una cadena de texto' })
  @Matches(/^\d{11}$/, { message: 'El RUC debe tener 11 dígitos' })
  ruc: string;

  @IsNotEmpty({ message: 'La dirección es requerida' })
  @IsString({ message: 'La dirección debe ser una cadena de texto' })
  direccion: string;

  @IsOptional()
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  telefono?: string;

  @IsOptional()
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'El sitio web debe ser una cadena de texto' })
  sitioWeb?: string;

  @IsOptional()
  @IsString({ message: 'El logo debe ser una cadena de texto' })
  logo?: string;

  @IsOptional()
  @IsString({ message: 'El color primario debe ser una cadena de texto' })
  @Matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: 'El color primario debe ser un color hexadecimal válido',
  })
  colorPrimario?: string;

  @IsOptional()
  @IsString({ message: 'El color secundario debe ser una cadena de texto' })
  @Matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: 'El color secundario debe ser un color hexadecimal válido',
  })
  colorSecundario?: string;

  @IsOptional()
  @IsBoolean({ message: 'El estado debe ser un booleano' })
  estado?: boolean;
}
