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
  CreateCalificacionDto,
  UpdateCalificacionDto,
  CrearCalificacionesMasivasDto,
  ActualizarCalificacionesMasivasDto,
} from '../../application/dto';
import {
  CreateCalificacionUseCase,
  CrearCalificacionesMasivasUseCase,
  GetAllCalificacionesUseCase,
  GetCalificacionByIdUseCase,
  GetCalificacionesByEvaluacionUseCase,
  GetCalificacionesByEstudianteUseCase,
  GetCalificacionByEvaluacionYEstudianteUseCase,
  UpdateCalificacionUseCase,
  ActualizarCalificacionesMasivasUseCase,
  DeleteCalificacionUseCase,
  GetPromedioByEstudianteYClaseUseCase,
  GetPromedioByEstudianteYPeriodoUseCase,
} from '../../application/use-cases/calificacion';

@ApiTags('Calificaciones')
@Controller('calificaciones')
@ApiBearerAuth()
@UseGuards(AuthGuard(), UserRoleGuard)
export class CalificacionController {
  constructor(
    private readonly createCalificacionUseCase: CreateCalificacionUseCase,
    private readonly crearCalificacionesMasivasUseCase: CrearCalificacionesMasivasUseCase,
    private readonly getAllCalificacionesUseCase: GetAllCalificacionesUseCase,
    private readonly getCalificacionByIdUseCase: GetCalificacionByIdUseCase,
    private readonly getCalificacionesByEvaluacionUseCase: GetCalificacionesByEvaluacionUseCase,
    private readonly getCalificacionesByEstudianteUseCase: GetCalificacionesByEstudianteUseCase,
    private readonly getCalificacionByEvaluacionYEstudianteUseCase: GetCalificacionByEvaluacionYEstudianteUseCase,
    private readonly updateCalificacionUseCase: UpdateCalificacionUseCase,
    private readonly actualizarCalificacionesMasivasUseCase: ActualizarCalificacionesMasivasUseCase,
    private readonly deleteCalificacionUseCase: DeleteCalificacionUseCase,
    private readonly getPromedioByEstudianteYClaseUseCase: GetPromedioByEstudianteYClaseUseCase,
    private readonly getPromedioByEstudianteYPeriodoUseCase: GetPromedioByEstudianteYPeriodoUseCase,
  ) {}

  @Post()
  @RoleProtected(
    RolesPermitidos.admin,
    RolesPermitidos.director,
    RolesPermitidos.profesor,
  )
  @ApiOperation({ summary: 'Crear una nueva calificación' })
  @ApiResponse({
    status: 201,
    description: 'Calificación creada correctamente',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  create(
    @Body() createCalificacionDto: CreateCalificacionDto,
    @GetUser('institucionId') institucionId: number,
  ) {
    return this.createCalificacionUseCase.execute(
      createCalificacionDto,
      institucionId,
    );
  }

  @Post('masivas')
  @RoleProtected(
    RolesPermitidos.admin,
    RolesPermitidos.director,
    RolesPermitidos.profesor,
  )
  @ApiOperation({
    summary: 'Crear múltiples calificaciones para una evaluación',
  })
  @ApiResponse({
    status: 201,
    description: 'Calificaciones creadas correctamente',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  createMany(
    @Body() crearCalificacionesMasivasDto: CrearCalificacionesMasivasDto,
    @GetUser('institucionId') institucionId: number,
  ) {
    return this.crearCalificacionesMasivasUseCase.execute(
      crearCalificacionesMasivasDto,
      institucionId,
    );
  }

  @Get()
  @RoleProtected(
    RolesPermitidos.admin,
    RolesPermitidos.director,
    RolesPermitidos.profesor,
  )
  @ApiOperation({ summary: 'Obtener todas las calificaciones' })
  @ApiResponse({ status: 200, description: 'Lista de calificaciones' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  findAll(@GetUser('institucionId') institucionId: number) {
    return this.getAllCalificacionesUseCase.execute(institucionId);
  }

  @Get('evaluacion/:evaluacionId')
  @RoleProtected(
    RolesPermitidos.admin,
    RolesPermitidos.director,
    RolesPermitidos.profesor,
  )
  @ApiOperation({ summary: 'Obtener calificaciones por evaluación' })
  @ApiResponse({
    status: 200,
    description: 'Lista de calificaciones de la evaluación',
  })
  @ApiResponse({ status: 404, description: 'Evaluación no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  findByEvaluacion(
    @Param('evaluacionId', ParseIntPipe) evaluacionId: number,
    @GetUser('institucionId') institucionId: number,
  ) {
    return this.getCalificacionesByEvaluacionUseCase.execute(
      evaluacionId,
      institucionId,
    );
  }

  @Get('estudiante/:estudianteId')
  @RoleProtected(
    RolesPermitidos.admin,
    RolesPermitidos.director,
    RolesPermitidos.profesor,
    RolesPermitidos.estudiante,
    RolesPermitidos.apoderado,
  )
  @ApiOperation({ summary: 'Obtener calificaciones por estudiante' })
  @ApiResponse({
    status: 200,
    description: 'Lista de calificaciones del estudiante',
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  findByEstudiante(
    @Param('estudianteId', ParseIntPipe) estudianteId: number,
    @GetUser('institucionId') institucionId: number,
  ) {
    return this.getCalificacionesByEstudianteUseCase.execute(
      estudianteId,
      institucionId,
    );
  }

  @Get('evaluacion/:evaluacionId/estudiante/:estudianteId')
  @RoleProtected(
    RolesPermitidos.admin,
    RolesPermitidos.director,
    RolesPermitidos.profesor,
    RolesPermitidos.estudiante,
    RolesPermitidos.apoderado,
  )
  @ApiOperation({
    summary:
      'Obtener calificación de un estudiante en una evaluación específica',
  })
  @ApiResponse({ status: 200, description: 'Calificación encontrada' })
  @ApiResponse({ status: 404, description: 'Calificación no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  findByEvaluacionYEstudiante(
    @Param('evaluacionId', ParseIntPipe) evaluacionId: number,
    @Param('estudianteId', ParseIntPipe) estudianteId: number,
    @GetUser('institucionId') institucionId: number,
  ) {
    return this.getCalificacionByEvaluacionYEstudianteUseCase.execute(
      evaluacionId,
      estudianteId,
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
  @ApiOperation({ summary: 'Obtener una calificación por ID' })
  @ApiResponse({ status: 200, description: 'Calificación encontrada' })
  @ApiResponse({ status: 404, description: 'Calificación no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('institucionId') institucionId: number,
  ) {
    return this.getCalificacionByIdUseCase.execute(id, institucionId);
  }

  @Get('promedio/estudiante/:estudianteId/clase/:claseId')
  @RoleProtected(
    RolesPermitidos.admin,
    RolesPermitidos.director,
    RolesPermitidos.profesor,
    RolesPermitidos.estudiante,
    RolesPermitidos.apoderado,
  )
  @ApiOperation({
    summary: 'Obtener promedio de calificaciones de un estudiante en una clase',
  })
  @ApiResponse({ status: 200, description: 'Promedio calculado correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  getPromedioClase(
    @Param('estudianteId', ParseIntPipe) estudianteId: number,
    @Param('claseId', ParseIntPipe) claseId: number,
    @GetUser('institucionId') institucionId: number,
  ) {
    return this.getPromedioByEstudianteYClaseUseCase.execute(
      estudianteId,
      claseId,
      institucionId,
    );
  }

  @Get('promedio/estudiante/:estudianteId/periodo/:periodoId')
  @RoleProtected(
    RolesPermitidos.admin,
    RolesPermitidos.director,
    RolesPermitidos.profesor,
    RolesPermitidos.estudiante,
    RolesPermitidos.apoderado,
  )
  @ApiOperation({
    summary:
      'Obtener promedio de calificaciones de un estudiante en un periodo académico',
  })
  @ApiResponse({ status: 200, description: 'Promedio calculado correctamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  getPromedioPeriodo(
    @Param('estudianteId', ParseIntPipe) estudianteId: number,
    @Param('periodoId', ParseIntPipe) periodoId: number,
    @GetUser('institucionId') institucionId: number,
  ) {
    return this.getPromedioByEstudianteYPeriodoUseCase.execute(
      estudianteId,
      periodoId,
      institucionId,
    );
  }

  @Patch(':id')
  @RoleProtected(
    RolesPermitidos.admin,
    RolesPermitidos.director,
    RolesPermitidos.profesor,
  )
  @ApiOperation({ summary: 'Actualizar una calificación' })
  @ApiResponse({
    status: 200,
    description: 'Calificación actualizada correctamente',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Calificación no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCalificacionDto: UpdateCalificacionDto,
    @GetUser('institucionId') institucionId: number,
  ) {
    return this.updateCalificacionUseCase.execute(
      id,
      updateCalificacionDto,
      institucionId,
    );
  }

  @Patch('masivas')
  @RoleProtected(
    RolesPermitidos.admin,
    RolesPermitidos.director,
    RolesPermitidos.profesor,
  )
  @ApiOperation({ summary: 'Actualizar múltiples calificaciones' })
  @ApiResponse({
    status: 200,
    description: 'Calificaciones actualizadas correctamente',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  updateMany(
    @Body()
    actualizarCalificacionesMasivasDto: ActualizarCalificacionesMasivasDto,
    @GetUser('institucionId') institucionId: number,
  ) {
    return this.actualizarCalificacionesMasivasUseCase.execute(
      actualizarCalificacionesMasivasDto,
      institucionId,
    );
  }

  @Delete(':id')
  @RoleProtected(
    RolesPermitidos.admin,
    RolesPermitidos.director,
    RolesPermitidos.profesor,
  )
  @ApiOperation({ summary: 'Eliminar una calificación' })
  @ApiResponse({
    status: 200,
    description: 'Calificación eliminada correctamente',
  })
  @ApiResponse({ status: 404, description: 'Calificación no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('institucionId') institucionId: number,
  ) {
    return this.deleteCalificacionUseCase.execute(id, institucionId);
  }
}
