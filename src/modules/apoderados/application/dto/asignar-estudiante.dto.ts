import { TipoParentesco } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class AsignarEstudianteDto {
  @IsNumber()
  @IsNotEmpty({ message: 'El ID del apoderado es obligatorio' })
  apoderadoId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'El ID del estudiante es obligatorio' })
  estudianteId: number;

  @IsEnum(TipoParentesco, {
    message: 'El parentesco debe ser uno de los tipos válidos',
  })
  @IsNotEmpty({ message: 'El tipo de parentesco es obligatorio' })
  parentesco: TipoParentesco;

  @IsBoolean()
  @IsOptional()
  esPrincipal?: boolean;
}
