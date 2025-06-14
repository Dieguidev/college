// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\dto\create-curso.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCursoDto {
  @ApiProperty({ description: 'Nombre del curso' })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({ description: 'Descripción del curso', required: false })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ description: 'Código interno del curso', required: false })
  @IsOptional()
  @IsString()
  codigoInterno?: string;
}
