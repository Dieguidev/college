// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\dto\update-anio-academico.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDate, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateAnioAcademicoDto {
  @ApiProperty({ description: 'Nombre del año académico', required: false })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiProperty({
    description: 'Fecha de inicio del año académico',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fechaInicio?: Date;

  @ApiProperty({
    description: 'Fecha de fin del año académico',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fechaFin?: Date;

  @ApiProperty({
    description: 'Indica si el año académico está activo',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
