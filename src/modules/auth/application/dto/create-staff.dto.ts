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
import { Role } from '../../domain/value-objects/role.value-object';

export class CreateStaffDto {
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
    description: 'Nombres del miembro del staff',
    example: 'Ana María',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty({ message: 'Los nombres son obligatorios' })
  @MaxLength(100, {
    message: 'Los nombres no deben exceder los 100 caracteres',
  })
  nombres: string;

  @ApiProperty({
    description: 'Apellidos del miembro del staff',
    example: 'López Mendoza',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty({ message: 'Los apellidos son obligatorios' })
  @MaxLength(100, {
    message: 'Los apellidos no deben exceder los 100 caracteres',
  })
  apellidos: string;

  @ApiProperty({
    description: 'Fecha de nacimiento',
    example: '1985-05-20T00:00:00.000Z',
    type: Date,
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
  fechaNacimiento: Date;

  @ApiProperty({
    description: 'Género del miembro del staff',
    example: Genero.FEMENINO,
    enum: Genero,
  })
  @IsEnum(Genero, { message: 'El género debe ser MASCULINO, FEMENINO o OTRO' })
  @IsNotEmpty({ message: 'El género es obligatorio' })
  genero: Genero;
  @ApiPropertyOptional({
    description: 'Dirección del miembro del staff',
    example: 'Av. Principal 123, Ciudad',
    maxLength: 255,
  })
  @IsString()
  @IsOptional()
  @MaxLength(255, {
    message: 'La dirección no debe exceder los 255 caracteres',
  })
  direccion?: string;

  @ApiProperty({
    description: 'Teléfono de contacto',
    example: '+51 987654321',
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  @MaxLength(20, {
    message: 'El teléfono no debe exceder los 20 caracteres',
  })
  telefono: string;

  @ApiProperty({
    description: 'Correo electrónico',
    example: 'ana.lopez@ejemplo.com',
    maxLength: 100,
  })
  @IsEmail({}, { message: 'Formato de correo electrónico inválido' })
  @IsNotEmpty({ message: 'El email es obligatorio para el personal' })
  @MaxLength(100, {
    message: 'El email no debe exceder los 100 caracteres',
  })
  email: string;

  @ApiPropertyOptional({
    description: 'Profesión del miembro del staff',
    example: 'Licenciado en Educación',
    maxLength: 100,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100, {
    message: 'La profesión no debe exceder los 100 caracteres',
  })
  profesion?: string;
  @ApiPropertyOptional({
    description: 'Fecha de contratación',
    example: '2023-01-10T00:00:00.000Z',
    type: Date,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  fechaContratacion?: Date;

  @ApiProperty({
    description: 'Contraseña del miembro del staff',
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
    description: 'Rol del miembro del staff en el sistema',
    example: Role.PROFESOR,
    enum: Role,
  })
  @IsEnum(Role, {
    message: 'El rol debe ser uno de los roles válidos del sistema',
  })
  @IsNotEmpty({ message: 'El rol es obligatorio' })
  rol: Role;

  @ApiProperty({
    description: 'ID de la institución a la que pertenece',
    example: 1,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'El ID de la institución es obligatorio' })
  institucionId: number;
}
