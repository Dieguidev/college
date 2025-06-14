// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\apoderados\interfaces\controllers\apoderados.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { Auth } from '../../../auth/decorators/auth.decorator';
import { UserRole } from '../../../auth/domain/entities/user.entity';
import { InstitucionIdParam } from '../../../instituciones/interfaces/decorators/institucion-id-param.decorator';
import {
  CreateApoderadoUseCase,
  GetAllApoderadosUseCase,
  GetApoderadoByIdUseCase,
  UpdateApoderadoUseCase,
  DeleteApoderadoUseCase,
  AsignarEstudianteUseCase,
  GetApoderadosPorEstudianteUseCase,
  GetEstudiantesPorApoderadoUseCase,
  RemoverEstudianteUseCase,
} from '../../application/use-cases';
import {
  CreateApoderadoDto,
  UpdateApoderadoDto,
  AsignarEstudianteDto,
} from '../../application/dto';

@ApiTags('apoderados')
@ApiBearerAuth()
@Controller('instituciones/:institucionId/apoderados')
export class ApoderadosController {
  constructor(
    private readonly createApoderadoUseCase: CreateApoderadoUseCase,
    private readonly getAllApoderadosUseCase: GetAllApoderadosUseCase,
    private readonly getApoderadoByIdUseCase: GetApoderadoByIdUseCase,
    private readonly updateApoderadoUseCase: UpdateApoderadoUseCase,
    private readonly deleteApoderadoUseCase: DeleteApoderadoUseCase,
    private readonly asignarEstudianteUseCase: AsignarEstudianteUseCase,
    private readonly getApoderadosPorEstudianteUseCase: GetApoderadosPorEstudianteUseCase,
    private readonly getEstudiantesPorApoderadoUseCase: GetEstudiantesPorApoderadoUseCase,
    private readonly removerEstudianteUseCase: RemoverEstudianteUseCase,
  ) {}

  @Post()
  @Auth(UserRole.ADMIN, UserRole.DIRECTOR)
  @ApiOperation({ summary: 'Crear un nuevo apoderado' })
  create(
    @Body() createApoderadoDto: CreateApoderadoDto,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.createApoderadoUseCase.execute(
      createApoderadoDto,
      institucionId,
    );
  }

  @Get()
  @Auth(UserRole.ADMIN, UserRole.DIRECTOR, UserRole.PROFESOR)
  @ApiOperation({ summary: 'Obtener todos los apoderados' })
  findAll(@InstitucionIdParam() institucionId: number) {
    return this.getAllApoderadosUseCase.execute(institucionId);
  }

  @Get(':id')
  @Auth(UserRole.ADMIN, UserRole.DIRECTOR, UserRole.PROFESOR)
  @ApiOperation({ summary: 'Obtener un apoderado por ID' })
  @ApiParam({ name: 'id', description: 'ID del apoderado' })
  findOne(
    @Param('id') id: string,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.getApoderadoByIdUseCase.execute(+id, institucionId);
  }

  @Patch(':id')
  @Auth(UserRole.ADMIN, UserRole.DIRECTOR)
  @ApiOperation({ summary: 'Actualizar un apoderado' })
  @ApiParam({ name: 'id', description: 'ID del apoderado' })
  update(
    @Param('id') id: string,
    @Body() updateApoderadoDto: UpdateApoderadoDto,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.updateApoderadoUseCase.execute(
      +id,
      updateApoderadoDto,
      institucionId,
    );
  }

  @Delete(':id')
  @Auth(UserRole.ADMIN, UserRole.DIRECTOR)
  @ApiOperation({ summary: 'Eliminar un apoderado' })
  @ApiParam({ name: 'id', description: 'ID del apoderado' })
  remove(@Param('id') id: string, @InstitucionIdParam() institucionId: number) {
    return this.deleteApoderadoUseCase.execute(+id, institucionId);
  }

  @Post(':id/estudiantes')
  @Auth(UserRole.ADMIN, UserRole.DIRECTOR)
  @ApiOperation({ summary: 'Asignar un estudiante a un apoderado' })
  @ApiParam({ name: 'id', description: 'ID del apoderado' })
  asignarEstudiante(
    @Param('id') id: string,
    @Body() asignarEstudianteDto: AsignarEstudianteDto,
    @InstitucionIdParam() institucionId: number,
  ) {
    // Aseguramos que el ID en la ruta coincida con el ID en el DTO
    asignarEstudianteDto.apoderadoId = +id;
    return this.asignarEstudianteUseCase.execute(asignarEstudianteDto);
  }

  @Delete(':id/estudiantes/:estudianteId')
  @Auth(UserRole.ADMIN, UserRole.DIRECTOR)
  @ApiOperation({ summary: 'Remover un estudiante de un apoderado' })
  @ApiParam({ name: 'id', description: 'ID del apoderado' })
  @ApiParam({ name: 'estudianteId', description: 'ID del estudiante' })
  removerEstudiante(
    @Param('id') id: string,
    @Param('estudianteId') estudianteId: string,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.removerEstudianteUseCase.execute(
      +id,
      +estudianteId,
      institucionId,
    );
  }

  @Get(':id/estudiantes')
  @Auth(UserRole.ADMIN, UserRole.DIRECTOR, UserRole.PROFESOR)
  @ApiOperation({ summary: 'Obtener los estudiantes de un apoderado' })
  @ApiParam({ name: 'id', description: 'ID del apoderado' })
  getEstudiantes(
    @Param('id') id: string,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.getEstudiantesPorApoderadoUseCase.execute(+id, institucionId);
  }

  @Get('estudiantes/:estudianteId')
  @Auth(UserRole.ADMIN, UserRole.DIRECTOR, UserRole.PROFESOR)
  @ApiOperation({ summary: 'Obtener los apoderados de un estudiante' })
  @ApiParam({ name: 'estudianteId', description: 'ID del estudiante' })
  getApoderadosPorEstudiante(
    @Param('estudianteId') estudianteId: string,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.getApoderadosPorEstudianteUseCase.execute(
      +estudianteId,
      institucionId,
    );
  }
}
