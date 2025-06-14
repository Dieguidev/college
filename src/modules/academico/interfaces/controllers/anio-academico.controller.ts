// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\interfaces\controllers\anio-academico.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { Auth } from '../../../auth/decorators/auth.decorator';
import { UserRole } from '../../../auth/domain/entities/user.entity';
import { InstitucionIdParam } from '../../../instituciones/interfaces/decorators/institucion-id-param.decorator';
import {
  CreateAnioAcademicoUseCase,
  GetAllAniosAcademicosUseCase,
  GetAnioAcademicoByIdUseCase,
  UpdateAnioAcademicoUseCase,
  DeleteAnioAcademicoUseCase,
  GetActiveAnioAcademicoUseCase,
  ActivateAnioAcademicoUseCase,
} from '../../application/use-cases';
import {
  CreateAnioAcademicoDto,
  UpdateAnioAcademicoDto,
} from '../../application/dto';

@ApiTags('años académicos')
@ApiBearerAuth()
@Controller('instituciones/:institucionId/academico/anios-academicos')
export class AnioAcademicoController {
  constructor(
    private readonly createAnioAcademicoUseCase: CreateAnioAcademicoUseCase,
    private readonly getAllAniosAcademicosUseCase: GetAllAniosAcademicosUseCase,
    private readonly getAnioAcademicoByIdUseCase: GetAnioAcademicoByIdUseCase,
    private readonly updateAnioAcademicoUseCase: UpdateAnioAcademicoUseCase,
    private readonly deleteAnioAcademicoUseCase: DeleteAnioAcademicoUseCase,
    private readonly getActiveAnioAcademicoUseCase: GetActiveAnioAcademicoUseCase,
    private readonly activateAnioAcademicoUseCase: ActivateAnioAcademicoUseCase,
  ) {}

  @Post()
  @Auth(UserRole.ADMIN, UserRole.DIRECTOR)
  @ApiOperation({ summary: 'Crear un nuevo año académico' })
  create(
    @Body() createAnioAcademicoDto: CreateAnioAcademicoDto,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.createAnioAcademicoUseCase.execute(
      createAnioAcademicoDto,
      institucionId,
    );
  }

  @Get()
  @Auth(
    UserRole.ADMIN,
    UserRole.DIRECTOR,
    UserRole.PROFESOR,
    UserRole.ASISTENTE,
  )
  @ApiOperation({ summary: 'Obtener todos los años académicos' })
  findAll(@InstitucionIdParam() institucionId: number) {
    return this.getAllAniosAcademicosUseCase.execute(institucionId);
  }

  @Get('activo')
  @Auth(
    UserRole.ADMIN,
    UserRole.DIRECTOR,
    UserRole.PROFESOR,
    UserRole.ASISTENTE,
  )
  @ApiOperation({ summary: 'Obtener el año académico activo' })
  getActive(@InstitucionIdParam() institucionId: number) {
    return this.getActiveAnioAcademicoUseCase.execute(institucionId);
  }

  @Post(':id/activar')
  @Auth(UserRole.ADMIN, UserRole.DIRECTOR)
  @ApiOperation({ summary: 'Activar un año académico' })
  @ApiParam({ name: 'id', description: 'ID del año académico' })
  activateYear(
    @Param('id') id: string,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.activateAnioAcademicoUseCase.execute(+id, institucionId);
  }

  @Get(':id')
  @Auth(
    UserRole.ADMIN,
    UserRole.DIRECTOR,
    UserRole.PROFESOR,
    UserRole.ASISTENTE,
  )
  @ApiOperation({ summary: 'Obtener un año académico por ID' })
  @ApiParam({ name: 'id', description: 'ID del año académico' })
  findOne(
    @Param('id') id: string,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.getAnioAcademicoByIdUseCase.execute(+id, institucionId);
  }

  @Patch(':id')
  @Auth(UserRole.ADMIN, UserRole.DIRECTOR)
  @ApiOperation({ summary: 'Actualizar un año académico' })
  @ApiParam({ name: 'id', description: 'ID del año académico' })
  update(
    @Param('id') id: string,
    @Body() updateAnioAcademicoDto: UpdateAnioAcademicoDto,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.updateAnioAcademicoUseCase.execute(
      +id,
      updateAnioAcademicoDto,
      institucionId,
    );
  }

  @Delete(':id')
  @Auth(UserRole.ADMIN, UserRole.DIRECTOR)
  @ApiOperation({ summary: 'Eliminar un año académico' })
  @ApiParam({ name: 'id', description: 'ID del año académico' })
  remove(@Param('id') id: string, @InstitucionIdParam() institucionId: number) {
    return this.deleteAnioAcademicoUseCase.execute(+id, institucionId);
  }
}
