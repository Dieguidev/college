import { PartialType } from '@nestjs/swagger';
import { CreateInstitucionDto } from './create-institucion.dto';
import { IsOptional } from 'class-validator';

export class UpdateInstitucionDto extends PartialType(CreateInstitucionDto) {
  // Hacemos todas las propiedades opcionales para la actualización
  // y eliminamos propiedades relacionadas con el administrador, ya que eso no debería actualizarse aquí
  @IsOptional()
  adminDni?: string;

  @IsOptional()
  adminNombres?: string;

  @IsOptional()
  adminApellidos?: string;

  @IsOptional()
  adminTelefono?: string;

  @IsOptional()
  adminEmail?: string;
}
