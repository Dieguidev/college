import { Genero } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePersonalDto {
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
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  @MaxLength(20, {
    message: 'El teléfono no debe exceder los 20 caracteres',
  })
  telefono: string;

  @IsEmail({}, { message: 'Formato de correo electrónico inválido' })
  @IsNotEmpty({ message: 'El email es obligatorio para el personal' })
  @MaxLength(100, {
    message: 'El email no debe exceder los 100 caracteres',
  })
  email: string;

  @IsString()
  @IsOptional()
  @MaxLength(100, {
    message: 'La profesión no debe exceder los 100 caracteres',
  })
  profesion?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  fechaContratacion?: Date;

  @IsNumber()
  @IsNotEmpty({ message: 'El ID de la institución es obligatorio' })
  institucionId: number;
}
