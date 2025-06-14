// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\horarios\application\dto\update-periodo-academico.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreatePeriodoAcademicoDto } from './create-periodo-academico.dto';

export class UpdatePeriodoAcademicoDto extends PartialType(
  CreatePeriodoAcademicoDto,
) {}
