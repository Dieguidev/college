import { Genero, EstadoEstudiante } from '@prisma/client';
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

export class UpdateEstudianteDto {
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

  @IsEnum(EstadoEstudiante, {
    message:
      'El estado debe ser ACTIVO, INACTIVO, EGRESADO, TRASLADADO o SUSPENDIDO',
  })
  @IsOptional()
  estado?: EstadoEstudiante;

  @IsNumber()
  @IsNotEmpty({ message: 'El ID de la institución es obligatorio' })
  institucionId: number;
}
