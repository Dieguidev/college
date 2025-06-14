// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\dto\matricular-estudiante.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class MatricularEstudianteDto {
  @ApiProperty({ description: 'ID del estudiante' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  estudianteId: number;

  @ApiProperty({ description: 'ID del grado' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  gradoId: number;

  @ApiProperty({ description: 'Sección asignada', required: false })
  @IsOptional()
  @IsString()
  seccion?: string;
}
