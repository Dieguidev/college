// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\evaluaciones\application\dto\update-tipo-evaluacion.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateTipoEvaluacionDto } from './create-tipo-evaluacion.dto';

export class UpdateTipoEvaluacionDto extends PartialType(
  CreateTipoEvaluacionDto,
) {}
