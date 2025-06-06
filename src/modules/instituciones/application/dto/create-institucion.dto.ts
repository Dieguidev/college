import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsHexColor,
  IsUrl,
  Matches,
} from 'class-validator';

export class CreateInstitucionDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la institución es obligatorio' })
  @MaxLength(100, {
    message: 'El nombre no debe exceder los 100 caracteres',
  })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'El RUC/Identificador fiscal es obligatorio' })
  @MinLength(8, { message: 'El RUC debe tener al menos 8 caracteres' })
  @MaxLength(20, { message: 'El RUC no debe exceder los 20 caracteres' })
  @Matches(/^\d+$/, { message: 'El RUC debe contener solo números' })
  ruc: string;

  @IsString()
  @IsNotEmpty({ message: 'La dirección es obligatoria' })
  @MaxLength(255, {
    message: 'La dirección no debe exceder los 255 caracteres',
  })
  direccion: string;

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

  @IsUrl({}, { message: 'Formato de URL inválido' })
  @IsOptional()
  @MaxLength(100, {
    message: 'El sitio web no debe exceder los 100 caracteres',
  })
  sitioWeb?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255, {
    message: 'La URL del logo no debe exceder los 255 caracteres',
  })
  logo?: string;

  @IsHexColor({
    message: 'El color primario debe ser un valor hexadecimal válido',
  })
  @IsOptional()
  colorPrimario?: string;

  @IsHexColor({
    message: 'El color secundario debe ser un valor hexadecimal válido',
  })
  @IsOptional()
  colorSecundario?: string;

  // Datos del administrador que se creará junto con la institución
  @IsString()
  @IsNotEmpty({ message: 'El DNI del administrador es obligatorio' })
  @MinLength(8, { message: 'El DNI debe tener al menos 8 caracteres' })
  @MaxLength(20, { message: 'El DNI no debe exceder los 20 caracteres' })
  adminDni: string;

  @IsString()
  @IsNotEmpty({ message: 'Los nombres del administrador son obligatorios' })
  @MaxLength(100, {
    message: 'Los nombres no deben exceder los 100 caracteres',
  })
  adminNombres: string;

  @IsString()
  @IsNotEmpty({ message: 'Los apellidos del administrador son obligatorios' })
  @MaxLength(100, {
    message: 'Los apellidos no deben exceder los 100 caracteres',
  })
  adminApellidos: string;

  @IsString()
  @IsNotEmpty({ message: 'El teléfono del administrador es obligatorio' })
  @MaxLength(20, {
    message: 'El teléfono no debe exceder los 20 caracteres',
  })
  adminTelefono: string;

  @IsEmail({}, { message: 'Formato de correo electrónico inválido' })
  @IsNotEmpty({ message: 'El email del administrador es obligatorio' })
  @MaxLength(100, {
    message: 'El email no debe exceder los 100 caracteres',
  })
  adminEmail: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contraseña debe tener al menos una letra mayúscula, una minúscula y un número',
  })
  @IsNotEmpty({ message: 'La contraseña del administrador es obligatoria' })
  adminPassword: string;
}
