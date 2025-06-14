// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\dto\create-grado.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGradoDto {
  @ApiProperty({ description: 'Nombre del grado' })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'ID del nivel educativo al que pertenece el grado',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  nivelId: number;

  @ApiProperty({
    description: 'ID del año académico al que pertenece el grado',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  anioAcademicoId: number;

  @ApiProperty({ description: 'Descripción del grado', required: false })
  @IsOptional()
  @IsString()
  descripcion?: string;
}
