// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\dto\update-curso.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCursoDto {
  @ApiProperty({ description: 'Nombre del curso', required: false })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiProperty({ description: 'Descripción del curso', required: false })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ description: 'Código interno del curso', required: false })
  @IsOptional()
  @IsString()
  codigoInterno?: string;
}
