// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\dto\create-anio-academico.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAnioAcademicoDto {
  @ApiProperty({ description: 'Nombre del año académico' })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({ description: 'Fecha de inicio del año académico' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  fechaInicio: Date;

  @ApiProperty({ description: 'Fecha de fin del año académico' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  fechaFin: Date;

  @ApiProperty({
    description: 'Indica si el año académico está activo',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
