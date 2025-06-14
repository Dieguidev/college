import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from '../../../auth/interfaces/decorators/role-protected.decorator';
import { UserRoleGuard } from '../../../auth/interfaces/guards/user-role.guard';
import { RolesPermitidos } from '../../../auth/domain/entities/user.entity';
import { GetUser } from '../../../auth/interfaces/decorators/get-user.decorator';
import {
  CreateEvaluacionDto,
  UpdateEvaluacionDto,
} from '../../application/dto';
import {
  CreateEvaluacionUseCase,
  GetAllEvaluacionesUseCase,
  GetEvaluacionByIdUseCase,
  GetEvaluacionesByClaseUseCase,
  GetEvaluacionesByPeriodoUseCase,
  GetEvaluacionesByTipoUseCase,
  GetEvaluacionesByRangoFechasUseCase,
  UpdateEvaluacionUseCase,
  DeleteEvaluacionUseCase,
  PublicarEvaluacionUseCase,
  DespublicarEvaluacionUseCase,
} from '../../application/use-cases/evaluacion';

@ApiTags('Evaluaciones')
@Controller('evaluaciones')
@ApiBearerAuth()
@UseGuards(AuthGuard(), UserRoleGuard)
export class EvaluacionController {
  constructor(
    private readonly createEvaluacionUseCase: CreateEvaluacionUseCase,
    private readonly getAllEvaluacionesUseCase: GetAllEvaluacionesUseCase,
    private readonly getEvaluacionByIdUseCase: GetEvaluacionByIdUseCase,
    private readonly getEvaluacionesByClaseUseCase: GetEvaluacionesByClaseUseCase,
    private readonly getEvaluacionesByPeriodoUseCase: GetEvaluacionesByPeriodoUseCase,
    private readonly getEvaluacionesByTipoUseCase: GetEvaluacionesByTipoUseCase,
    private readonly getEvaluacionesByRangoFechasUseCase: GetEvaluacionesByRangoFechasUseCase,
    private readonly updateEvaluacionUseCase: UpdateEvaluacionUseCase,
    private readonly deleteEvaluacionUseCase: DeleteEvaluacionUseCase,
    private readonly publicarEvaluacionUseCase: PublicarEvaluacionUseCase,
    private readonly despublicarEvaluacionUseCase: DespublicarEvaluacionUseCase,
  ) {}

  @Post()
  @RoleProtected(
    RolesPermitidos.admin,
    RolesPermitidos.director,
    RolesPermitidos.profesor,
  )
  @ApiOperation({ summary: 'Crear una nueva evaluación' })
  @ApiResponse({ status: 201, description: 'Evaluación creada correctamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  create(
    @Body() createEvaluacionDto: CreateEvaluacionDto,
    @GetUser('institucionId') institucionId: number,
  ) {
    return this.createEvaluacionUseCase.execute(
      createEvaluacionDto,
      institucionId,
    );
  }

  @Get()
  @RoleProtected(
    RolesPermitidos.admin,
    RolesPermitidos.director,
    RolesPermitidos.profesor,
    RolesPermitidos.estudiante,
    RolesPermitidos.apoderado,
  )
  @ApiOperation({ summary: 'Obtener todas las evaluaciones' })
  @ApiResponse({ status: 200, description: 'Lista de evaluaciones' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  findAll(@GetUser('institucionId') institucionId: number) {
    return this.getAllEvaluacionesUseCase.execute(institucionId);
  }

  @Get('clase/:claseId')
  @RoleProtected(
    RolesPermitidos.admin,
    RolesPermitidos.director,
    RolesPermitidos.profesor,
    RolesPermitidos.estudiante,
    RolesPermitidos.apoderado,
  )
  @ApiOperation({ summary: 'Obtener evaluaciones por clase' })
  @ApiResponse({
    status: 200,
    description: 'Lista de evaluaciones de la clase',
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  findByClase(
    @Param('claseId', ParseIntPipe) claseId: number,
    @GetUser('institucionId') institucionId: number,
  ) {
    return this.getEvaluacionesByClaseUseCase.execute(claseId, institucionId);
  }

  @Get('periodo/:periodoId')
  @RoleProtected(
    RolesPermitidos.admin,
    RolesPermitidos.director,
    RolesPermitidos.profesor,
    RolesPermitidos.estudiante,
    RolesPermitidos.apoderado,
  )
  @ApiOperation({ summary: 'Obtener evaluaciones por periodo académico' })
  @ApiResponse({
    status: 200,
    description: 'Lista de evaluaciones del periodo académico',
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  findByPeriodo(
    @Param('periodoId', ParseIntPipe) periodoId: number,
    @GetUser('institucionId') institucionId: number,
  ) {
    return this.getEvaluacionesByPeriodoUseCase.execute(
      periodoId,
      institucionId,
    );
  }

  @Get('tipo/:tipoId')
  @RoleProtected(
    RolesPermitidos.admin,
    RolesPermitidos.director,
    RolesPermitidos.profesor,
    RolesPermitidos.estudiante,
    RolesPermitidos.apoderado,
  )
  @ApiOperation({ summary: 'Obtener evaluaciones por tipo' })
  @ApiResponse({
    status: 200,
    description: 'Lista de evaluaciones del tipo especificado',
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  findByTipo(
    @Param('tipoId', ParseIntPipe) tipoId: number,
    @GetUser('institucionId') institucionId: number,
  ) {
    return this.getEvaluacionesByTipoUseCase.execute(tipoId, institucionId);
  }

  @Get('rango-fechas')
  @RoleProtected(
    RolesPermitidos.admin,
    RolesPermitidos.director,
    RolesPermitidos.profesor,
    RolesPermitidos.estudiante,
    RolesPermitidos.apoderado,
  )
  @ApiOperation({ summary: 'Obtener evaluaciones por rango de fechas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de evaluaciones en el rango de fechas',
  })
  @ApiResponse({ status: 400, description: 'Rango de fechas inválido' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  findByRangoFechas(
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string,
    @GetUser('institucionId') institucionId: number,
  ) {
    return this.getEvaluacionesByRangoFechasUseCase.execute(
      new Date(fechaInicio),
      new Date(fechaFin),
      institucionId,
    );
  }

  @Get(':id')
  @RoleProtected(
    RolesPermitidos.admin,
    RolesPermitidos.director,
    RolesPermitidos.profesor,
    RolesPermitidos.estudiante,
    RolesPermitidos.apoderado,
  )
  @ApiOperation({ summary: 'Obtener una evaluación por ID' })
  @ApiResponse({ status: 200, description: 'Evaluación encontrada' })
  @ApiResponse({ status: 404, description: 'Evaluación no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('institucionId') institucionId: number,
  ) {
    return this.getEvaluacionByIdUseCase.execute(id, institucionId);
  }

  @Patch(':id')
  @RoleProtected(
    RolesPermitidos.admin,
    RolesPermitidos.director,
    RolesPermitidos.profesor,
  )
  @ApiOperation({ summary: 'Actualizar una evaluación' })
  @ApiResponse({
    status: 200,
    description: 'Evaluación actualizada correctamente',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Evaluación no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEvaluacionDto: UpdateEvaluacionDto,
    @GetUser('institucionId') institucionId: number,
  ) {
    return this.updateEvaluacionUseCase.execute(
      id,
      updateEvaluacionDto,
      institucionId,
    );
  }

  @Delete(':id')
  @RoleProtected(
    RolesPermitidos.admin,
    RolesPermitidos.director,
    RolesPermitidos.profesor,
  )
  @ApiOperation({ summary: 'Eliminar una evaluación' })
  @ApiResponse({
    status: 200,
    description: 'Evaluación eliminada correctamente',
  })
  @ApiResponse({ status: 404, description: 'Evaluación no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('institucionId') institucionId: number,
  ) {
    return this.deleteEvaluacionUseCase.execute(id, institucionId);
  }

  @Patch(':id/publicar')
  @RoleProtected(
    RolesPermitidos.admin,
    RolesPermitidos.director,
    RolesPermitidos.profesor,
  )
  @ApiOperation({ summary: 'Publicar una evaluación' })
  @ApiResponse({
    status: 200,
    description: 'Evaluación publicada correctamente',
  })
  @ApiResponse({ status: 404, description: 'Evaluación no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  publicar(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('institucionId') institucionId: number,
  ) {
    return this.publicarEvaluacionUseCase.execute(id, institucionId);
  }

  @Patch(':id/despublicar')
  @RoleProtected(
    RolesPermitidos.admin,
    RolesPermitidos.director,
    RolesPermitidos.profesor,
  )
  @ApiOperation({ summary: 'Despublicar una evaluación' })
  @ApiResponse({
    status: 200,
    description: 'Evaluación despublicada correctamente',
  })
  @ApiResponse({ status: 404, description: 'Evaluación no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  despublicar(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('institucionId') institucionId: number,
  ) {
    return this.despublicarEvaluacionUseCase.execute(id, institucionId);
  }
}
