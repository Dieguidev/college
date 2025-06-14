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
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({
    description: 'Documento de identidad',
    example: '12345678',
    minLength: 8,
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty({ message: 'El DNI es obligatorio' })
  @MinLength(8, { message: 'El DNI debe tener al menos 8 caracteres' })
  @MaxLength(20, { message: 'El DNI no debe exceder los 20 caracteres' })
  dni: string;

  @ApiProperty({
    description: 'Nombres del estudiante',
    example: 'Juan Carlos',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty({ message: 'Los nombres son obligatorios' })
  @MaxLength(100, {
    message: 'Los nombres no deben exceder los 100 caracteres',
  })
  nombres: string;

  @ApiProperty({
    description: 'Apellidos del estudiante',
    example: 'Pérez García',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty({ message: 'Los apellidos son obligatorios' })
  @MaxLength(100, {
    message: 'Los apellidos no deben exceder los 100 caracteres',
  })
  apellidos: string;

  @ApiProperty({
    description: 'Fecha de nacimiento del estudiante',
    example: '2000-01-15T00:00:00.000Z',
    type: Date,
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
  fechaNacimiento: Date;

  @ApiProperty({
    description: 'Género del estudiante',
    example: Genero.MASCULINO,
    enum: Genero,
  })
  @IsEnum(Genero, { message: 'El género debe ser MASCULINO, FEMENINO o OTRO' })
  @IsNotEmpty({ message: 'El género es obligatorio' })
  genero: Genero;
  @ApiPropertyOptional({
    description: 'Dirección del estudiante',
    example: 'Av. Principal 123, Ciudad',
    maxLength: 255,
  })
  @IsString()
  @IsOptional()
  @MaxLength(255, {
    message: 'La dirección no debe exceder los 255 caracteres',
  })
  direccion?: string;

  @ApiPropertyOptional({
    description: 'Teléfono de contacto',
    example: '+51 987654321',
    maxLength: 20,
  })
  @IsString()
  @IsOptional()
  @MaxLength(20, {
    message: 'El teléfono no debe exceder los 20 caracteres',
  })
  telefono?: string;

  @ApiPropertyOptional({
    description: 'Correo electrónico del estudiante',
    example: 'juan.perez@ejemplo.com',
    maxLength: 100,
  })
  @IsEmail({}, { message: 'Formato de correo electrónico inválido' })
  @IsOptional()
  @MaxLength(100, {
    message: 'El email no debe exceder los 100 caracteres',
  })
  email?: string;
  @ApiProperty({
    description: 'Contraseña del estudiante',
    example: 'Password123',
    minLength: 6,
    maxLength: 50,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contraseña debe tener al menos una letra mayúscula, una minúscula y un número',
  })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string;

  @ApiProperty({
    description: 'ID de la institución a la que pertenece el estudiante',
    example: 1,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'El ID de la institución es obligatorio' })
  institucionId: number;
}
