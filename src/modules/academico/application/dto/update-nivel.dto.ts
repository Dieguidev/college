// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\application\dto\update-nivel.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateNivelDto {
  @ApiProperty({ description: 'Nombre del nivel educativo', required: false })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiProperty({
    description: 'Descripción del nivel educativo',
    required: false,
  })
  @IsOptional()
  @IsString()
  descripcion?: string;
}
