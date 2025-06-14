// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\evaluaciones\application\dto\update-calificacion.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateCalificacionDto } from './create-calificacion.dto';

export class UpdateCalificacionDto extends PartialType(CreateCalificacionDto) {}
