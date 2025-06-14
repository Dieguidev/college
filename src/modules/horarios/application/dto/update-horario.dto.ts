// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\horarios\application\dto\update-horario.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateHorarioDto } from './create-horario.dto';

export class UpdateHorarioDto extends PartialType(CreateHorarioDto) {}
