// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\evaluaciones\application\dto\actualizar-calificaciones-masivas.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsArray,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

class ActualizarCalificacionItemDto {
  @ApiProperty({ description: 'ID de la calificación' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  id: number;

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

export class ActualizarCalificacionesMasivasDto {
  @ApiProperty({
    description: 'Lista de calificaciones a actualizar',
    type: [ActualizarCalificacionItemDto],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ActualizarCalificacionItemDto)
  calificaciones: ActualizarCalificacionItemDto[];
}
