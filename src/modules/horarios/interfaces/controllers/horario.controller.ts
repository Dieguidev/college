// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\horarios\interfaces\controllers\horario.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from '../../../auth/interfaces/decorators/auth.decorator';
import { Role } from '../../../auth/domain/value-objects/role.value-object';
import { InstitucionIdParam } from '../../../instituciones/interfaces/decorators';

import { DiaSemana } from '../../domain/entities/horario.entity';
import {
  CreateHorarioUseCase,
  GetAllHorariosUseCase,
  GetHorarioByIdUseCase,
  GetHorariosByClaseUseCase,
  GetHorariosByDiaUseCase,
  GetHorariosByGradoUseCase,
  GetHorariosByProfesorUseCase,
  UpdateHorarioUseCase,
  DeleteHorarioUseCase,
} from '../../application/use-cases';
import { CreateHorarioDto, UpdateHorarioDto } from '../../application/dto';

@ApiTags('horarios')
@ApiBearerAuth()
@Controller('instituciones/:institucionId/horarios')
export class HorarioController {
  constructor(
    private readonly createHorarioUseCase: CreateHorarioUseCase,
    private readonly getAllHorariosUseCase: GetAllHorariosUseCase,
    private readonly getHorarioByIdUseCase: GetHorarioByIdUseCase,
    private readonly getHorariosByClaseUseCase: GetHorariosByClaseUseCase,
    private readonly getHorariosByDiaUseCase: GetHorariosByDiaUseCase,
    private readonly getHorariosByGradoUseCase: GetHorariosByGradoUseCase,
    private readonly getHorariosByProfesorUseCase: GetHorariosByProfesorUseCase,
    private readonly updateHorarioUseCase: UpdateHorarioUseCase,
    private readonly deleteHorarioUseCase: DeleteHorarioUseCase,
  ) {}
  @Post()
  @Auth(Role.ADMIN, Role.DIRECTOR)
  @ApiOperation({ summary: 'Crear un nuevo horario' })
  create(
    @Body() createHorarioDto: CreateHorarioDto,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.createHorarioUseCase.execute(createHorarioDto, institucionId);
  }

  @Get()
  @Auth(Role.ADMIN, Role.DIRECTOR, Role.PROFESOR, Role.ASISTENTE)
  @ApiOperation({ summary: 'Obtener todos los horarios' })
  findAll(@InstitucionIdParam() institucionId: number) {
    return this.getAllHorariosUseCase.execute(institucionId);
  }

  @Get('por-clase/:claseId')
  @Auth(Role.ADMIN, Role.DIRECTOR, Role.PROFESOR, Role.ASISTENTE)
  @ApiOperation({ summary: 'Obtener horarios por clase' })
  @ApiParam({ name: 'claseId', description: 'ID de la clase' })
  findByClase(
    @Param('claseId') claseId: string,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.getHorariosByClaseUseCase.execute(+claseId, institucionId);
  }

  @Get('por-dia/:dia')
  @Auth(Role.ADMIN, Role.DIRECTOR, Role.PROFESOR, Role.ASISTENTE)
  @ApiOperation({ summary: 'Obtener horarios por día de la semana' })
  @ApiParam({ name: 'dia', description: 'Día de la semana', enum: DiaSemana })
  findByDia(
    @Param('dia') dia: DiaSemana,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.getHorariosByDiaUseCase.execute(dia, institucionId);
  }

  @Get('por-grado/:gradoId')
  @Auth(Role.ADMIN, Role.DIRECTOR, Role.PROFESOR, Role.ASISTENTE)
  @ApiOperation({ summary: 'Obtener horarios por grado' })
  @ApiParam({ name: 'gradoId', description: 'ID del grado' })
  findByGrado(
    @Param('gradoId') gradoId: string,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.getHorariosByGradoUseCase.execute(+gradoId, institucionId);
  }

  @Get('por-profesor/:profesorId')
  @Auth(Role.ADMIN, Role.DIRECTOR, Role.PROFESOR, Role.ASISTENTE)
  @ApiOperation({ summary: 'Obtener horarios por profesor' })
  @ApiParam({ name: 'profesorId', description: 'ID del profesor' })
  findByProfesor(
    @Param('profesorId') profesorId: string,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.getHorariosByProfesorUseCase.execute(
      +profesorId,
      institucionId,
    );
  }

  @Get(':id')
  @Auth(Role.ADMIN, Role.DIRECTOR, Role.PROFESOR, Role.ASISTENTE)
  @ApiOperation({ summary: 'Obtener un horario por ID' })
  @ApiParam({ name: 'id', description: 'ID del horario' })
  findOne(
    @Param('id') id: string,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.getHorarioByIdUseCase.execute(+id, institucionId);
  }

  @Patch(':id')
  @Auth(Role.ADMIN, Role.DIRECTOR)
  @ApiOperation({ summary: 'Actualizar un horario' })
  @ApiParam({ name: 'id', description: 'ID del horario' })
  update(
    @Param('id') id: string,
    @Body() updateHorarioDto: UpdateHorarioDto,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.updateHorarioUseCase.execute(
      +id,
      updateHorarioDto,
      institucionId,
    );
  }

  @Delete(':id')
  @Auth(Role.ADMIN, Role.DIRECTOR)
  @ApiOperation({ summary: 'Eliminar un horario' })
  @ApiParam({ name: 'id', description: 'ID del horario' })
  remove(@Param('id') id: string, @InstitucionIdParam() institucionId: number) {
    return this.deleteHorarioUseCase.execute(+id, institucionId);
  }
}
