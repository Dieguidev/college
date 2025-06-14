import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateApoderadoDto {
  @IsString()
  @IsOptional()
  @MaxLength(100, {
    message: 'Los nombres no deben exceder los 100 caracteres',
  })
  nombres?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100, {
    message: 'Los apellidos no deben exceder los 100 caracteres',
  })
  apellidos?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20, {
    message: 'El teléfono no debe exceder los 20 caracteres',
  })
  telefono?: string;

  @IsEmail({}, { message: 'Formato de correo electrónico inválido' })
  @IsOptional()
  @MaxLength(100, {
    message: 'El email no debe exceder los 100 caracteres',
  })
  email?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100, {
    message: 'La ocupación no debe exceder los 100 caracteres',
  })
  ocupacion?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255, {
    message: 'La dirección no debe exceder los 255 caracteres',
  })
  direccion?: string;

  @IsNumber()
  @IsNotEmpty({ message: 'El ID de la institución es obligatorio' })
  institucionId: number;
}
