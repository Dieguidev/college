// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\dto\update-clase.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateClaseDto {
  @ApiProperty({ description: 'ID del curso', required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  cursoId?: number;

  @ApiProperty({ description: 'ID del grado', required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  gradoId?: number;

  @ApiProperty({ description: 'ID del profesor (personal)', required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  personalId?: number;

  @ApiProperty({
    description: 'Horas semanales asignadas a la clase',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  horasSemanales?: number;

  @ApiProperty({
    description: 'Descripción adicional de la clase',
    required: false,
  })
  @IsOptional()
  @IsString()
  descripcion?: string;
}
