import { Genero, EstadoPersonal } from '@prisma/client';
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
} from 'class-validator';

export class UpdatePersonalDto {
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

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  fechaNacimiento?: Date;

  @IsEnum(Genero, { message: 'El género debe ser MASCULINO, FEMENINO o OTRO' })
  @IsOptional()
  genero?: Genero;

  @IsString()
  @IsOptional()
  @MaxLength(255, {
    message: 'La dirección no debe exceder los 255 caracteres',
  })
  direccion?: string;

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
    message: 'La profesión no debe exceder los 100 caracteres',
  })
  profesion?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  fechaContratacion?: Date;

  @IsEnum(EstadoPersonal, {
    message: 'El estado debe ser ACTIVO, INACTIVO, LICENCIA o VACACIONES',
  })
  @IsOptional()
  estado?: EstadoPersonal;

  @IsNumber()
  @IsNotEmpty({ message: 'El ID de la institución es obligatorio' })
  institucionId: number;
}
