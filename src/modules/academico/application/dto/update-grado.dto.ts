// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\dto\update-grado.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateGradoDto {
  @ApiProperty({ description: 'Nombre del grado', required: false })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiProperty({
    description: 'ID del nivel educativo al que pertenece el grado',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  nivelId?: number;

  @ApiProperty({
    description: 'ID del año académico al que pertenece el grado',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  anioAcademicoId?: number;

  @ApiProperty({ description: 'Descripción del grado', required: false })
  @IsOptional()
  @IsString()
  descripcion?: string;
}
