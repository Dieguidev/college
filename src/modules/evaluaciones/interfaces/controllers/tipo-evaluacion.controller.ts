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
  CreateTipoEvaluacionDto,
  UpdateTipoEvaluacionDto,
} from '../../application/dto';
import {
  CreateTipoEvaluacionUseCase,
  GetAllTiposEvaluacionUseCase,
  GetTipoEvaluacionByIdUseCase,
  UpdateTipoEvaluacionUseCase,
  DeleteTipoEvaluacionUseCase,
} from '../../application/use-cases/tipo-evaluacion';

@ApiTags('Tipos de Evaluación')
@Controller('tipos-evaluacion')
@ApiBearerAuth()
@UseGuards(AuthGuard(), UserRoleGuard)
export class TipoEvaluacionController {
  constructor(
    private readonly createTipoEvaluacionUseCase: CreateTipoEvaluacionUseCase,
    private readonly getAllTiposEvaluacionUseCase: GetAllTiposEvaluacionUseCase,
    private readonly getTipoEvaluacionByIdUseCase: GetTipoEvaluacionByIdUseCase,
    private readonly updateTipoEvaluacionUseCase: UpdateTipoEvaluacionUseCase,
    private readonly deleteTipoEvaluacionUseCase: DeleteTipoEvaluacionUseCase,
  ) {}

  @Post()
  @RoleProtected(
    RolesPermitidos.admin,
    RolesPermitidos.director,
    RolesPermitidos.profesor,
  )
  @ApiOperation({ summary: 'Crear un nuevo tipo de evaluación' })
  @ApiResponse({
    status: 201,
    description: 'Tipo de evaluación creado correctamente',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  create(
    @Body() createTipoEvaluacionDto: CreateTipoEvaluacionDto,
    @GetUser('institucionId') institucionId: number,
  ) {
    return this.createTipoEvaluacionUseCase.execute(
      createTipoEvaluacionDto,
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
  @ApiOperation({ summary: 'Obtener todos los tipos de evaluación' })
  @ApiResponse({ status: 200, description: 'Lista de tipos de evaluación' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  findAll(@GetUser('institucionId') institucionId: number) {
    return this.getAllTiposEvaluacionUseCase.execute(institucionId);
  }

  @Get(':id')
  @RoleProtected(
    RolesPermitidos.admin,
    RolesPermitidos.director,
    RolesPermitidos.profesor,
    RolesPermitidos.estudiante,
    RolesPermitidos.apoderado,
  )
  @ApiOperation({ summary: 'Obtener un tipo de evaluación por ID' })
  @ApiResponse({ status: 200, description: 'Tipo de evaluación encontrado' })
  @ApiResponse({ status: 404, description: 'Tipo de evaluación no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('institucionId') institucionId: number,
  ) {
    return this.getTipoEvaluacionByIdUseCase.execute(id, institucionId);
  }

  @Patch(':id')
  @RoleProtected(
    RolesPermitidos.admin,
    RolesPermitidos.director,
    RolesPermitidos.profesor,
  )
  @ApiOperation({ summary: 'Actualizar un tipo de evaluación' })
  @ApiResponse({
    status: 200,
    description: 'Tipo de evaluación actualizado correctamente',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Tipo de evaluación no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTipoEvaluacionDto: UpdateTipoEvaluacionDto,
    @GetUser('institucionId') institucionId: number,
  ) {
    return this.updateTipoEvaluacionUseCase.execute(
      id,
      updateTipoEvaluacionDto,
      institucionId,
    );
  }

  @Delete(':id')
  @RoleProtected(RolesPermitidos.admin, RolesPermitidos.director)
  @ApiOperation({ summary: 'Eliminar un tipo de evaluación' })
  @ApiResponse({
    status: 200,
    description: 'Tipo de evaluación eliminado correctamente',
  })
  @ApiResponse({ status: 404, description: 'Tipo de evaluación no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido - No tiene permisos' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('institucionId') institucionId: number,
  ) {
    return this.deleteTipoEvaluacionUseCase.execute(id, institucionId);
  }
}
