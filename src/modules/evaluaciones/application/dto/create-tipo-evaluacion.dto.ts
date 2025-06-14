// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\evaluaciones\application\dto\create-tipo-evaluacion.dto.ts
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

export class CreateTipoEvaluacionDto {
  @ApiProperty({ description: 'Nombre del tipo de evaluación' })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'Descripción del tipo de evaluación',
    required: false,
  })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({
    description: 'Peso porcentual del tipo de evaluación (0-100)',
    minimum: 0,
    maximum: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  @Type(() => Number)
  peso: number;
}
