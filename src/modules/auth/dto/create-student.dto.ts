import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Genero, Rol } from 'generated/prisma';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty({ message: 'El DNI es obligatorio' })
  @MinLength(8, { message: 'El DNI debe tener al menos 8 caracteres' })
  @MaxLength(20, { message: 'El DNI no debe exceder los 20 caracteres' })
  dni: string;

  @IsString()
  @IsNotEmpty({ message: 'Los nombres son obligatorios' })
  @MaxLength(100, {
    message: 'Los nombres no deben exceder los 100 caracteres',
  })
  nombres: string;

  @IsString()
  @IsNotEmpty({ message: 'Los apellidos son obligatorios' })
  @MaxLength(100, {
    message: 'Los apellidos no deben exceder los 100 caracteres',
  })
  apellidos: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
  fechaNacimiento: Date;

  @IsEnum(Genero, { message: 'El género debe ser MASCULINO, FEMENINO o OTRO' })
  @IsNotEmpty({ message: 'El género es obligatorio' })
  genero: Genero;

  @IsString()
  @IsOptional()
  @MaxLength(255, {
    message: 'La dirección no debe exceder los 255 caracteres',
  })
  direccion?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20, { message: 'El teléfono no debe exceder los 20 caracteres' })
  @Matches(/^[0-9+\-\s]*$/, { message: 'El formato del teléfono no es válido' })
  telefono?: string;

  @IsEmail({}, { message: 'El formato del email no es válido' })
  @IsOptional()
  @MaxLength(100, { message: 'El email no debe exceder los 100 caracteres' })
  email?: string;

  // Campos para la creación del usuario asociado
  // El username se generará automáticamente en el servicio

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @MaxLength(50, { message: 'La contraseña no debe exceder los 50 caracteres' })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contraseña debe contener al menos una letra mayúscula, una minúscula y un número o carácter especial',
  })
  password: string;

  @IsEnum(Rol, { message: 'El rol no es válido' })
  @IsOptional()
  rol?: Rol = Rol.ESTUDIANTE; // Por defecto, el rol será ESTUDIANTE
}
