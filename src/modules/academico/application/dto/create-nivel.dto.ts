// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\dto\create-nivel.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateNivelDto {
  @ApiProperty({ description: 'Nombre del nivel educativo' })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'Descripción del nivel educativo',
    required: false,
  })
  @IsOptional()
  @IsString()
  descripcion?: string;
}
