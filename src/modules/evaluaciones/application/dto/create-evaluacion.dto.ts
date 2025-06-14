// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\evaluaciones\application\dto\create-evaluacion.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
  IsBoolean,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEvaluacionDto {
  @ApiProperty({ description: 'Título de la evaluación' })
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @ApiProperty({ description: 'Descripción de la evaluación', required: false })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ description: 'ID de la clase asociada a la evaluación' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  claseId: number;

  @ApiProperty({ description: 'ID del tipo de evaluación' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  tipoEvaluacionId: number;

  @ApiProperty({ description: 'ID del periodo académico' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  periodoAcademicoId: number;

  @ApiProperty({
    description: 'Fecha de la evaluación (formato ISO)',
    example: '2025-06-15',
  })
  @IsNotEmpty()
  @IsDateString()
  fecha: string;

  @ApiProperty({
    description: 'Puntaje máximo de la evaluación',
    minimum: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  puntajeMaximo: number;

  @ApiProperty({
    description: 'Indica si la evaluación está publicada',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  publicada?: boolean = false;
}
