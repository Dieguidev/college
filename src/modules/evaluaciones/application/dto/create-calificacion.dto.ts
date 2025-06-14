// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\evaluaciones\application\dto\create-calificacion.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCalificacionDto {
  @ApiProperty({ description: 'ID de la evaluación' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  evaluacionId: number;

  @ApiProperty({ description: 'ID del estudiante' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  estudianteId: number;

  @ApiProperty({
    description: 'Puntaje obtenido en la evaluación',
    minimum: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  puntaje: number;

  @ApiProperty({
    description: 'Nota calculada (escala 1-7)',
    minimum: 1,
    maximum: 7,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(7)
  @Type(() => Number)
  nota: number;

  @ApiProperty({
    description: 'Observaciones sobre la calificación',
    required: false,
  })
  @IsOptional()
  @IsString()
  observaciones?: string;
}
