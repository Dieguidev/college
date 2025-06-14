// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\horarios\application\dto\create-periodo-academico.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePeriodoAcademicoDto {
  @ApiProperty({ description: 'Nombre del periodo académico' })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'Fecha de inicio del periodo (formato ISO)',
    example: '2025-03-01',
  })
  @IsNotEmpty()
  @IsDateString()
  fechaInicio: string;

  @ApiProperty({
    description: 'Fecha de fin del periodo (formato ISO)',
    example: '2025-07-15',
  })
  @IsNotEmpty()
  @IsDateString()
  fechaFin: string;

  @ApiProperty({
    description: 'ID del año académico al que pertenece este periodo',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  anioAcademicoId: number;
}
