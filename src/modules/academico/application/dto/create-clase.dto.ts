// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\dto\create-clase.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateClaseDto {
  @ApiProperty({ description: 'ID del curso' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  cursoId: number;

  @ApiProperty({ description: 'ID del grado' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  gradoId: number;

  @ApiProperty({ description: 'ID del profesor (personal)' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  personalId: number;

  @ApiProperty({ description: 'Horas semanales asignadas a la clase' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  horasSemanales: number;

  @ApiProperty({
    description: 'Descripción adicional de la clase',
    required: false,
  })
  @IsOptional()
  @IsString()
  descripcion?: string;
}
