// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\evaluaciones\application\dto\update-evaluacion.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateEvaluacionDto } from './create-evaluacion.dto';

export class UpdateEvaluacionDto extends PartialType(CreateEvaluacionDto) {}
