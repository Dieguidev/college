// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\horarios\application\dto\create-horario.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { DiaSemana } from '../../domain/entities/horario.entity';

export class CreateHorarioDto {
  @ApiProperty({ description: 'ID de la clase asociada' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  claseId: number;

  @ApiProperty({
    description: 'Día de la semana',
    enum: DiaSemana,
    example: DiaSemana.LUNES,
  })
  @IsNotEmpty()
  @IsEnum(DiaSemana)
  diaSemana: DiaSemana;

  @ApiProperty({
    description: 'Hora de inicio de la clase (formato HH:MM)',
    example: '08:00',
  })
  @IsNotEmpty()
  @IsString()
  horaInicio: string;

  @ApiProperty({
    description: 'Hora de fin de la clase (formato HH:MM)',
    example: '09:30',
  })
  @IsNotEmpty()
  @IsString()
  horaFin: string;
}
