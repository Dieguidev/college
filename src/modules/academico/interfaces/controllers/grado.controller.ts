// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\interfaces\controllers\grado.controller.ts
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
import { Auth } from '../../../auth/decorators/auth.decorator';
import { UserRole } from '../../../auth/domain/entities/user.entity';
import { InstitucionIdParam } from '../../../instituciones/interfaces/decorators/institucion-id-param.decorator';
import {
  CreateGradoUseCase,
  GetAllGradosUseCase,
  GetGradoByIdUseCase,
  GetGradosByNivelUseCase,
  GetGradosByAnioAcademicoUseCase,
  UpdateGradoUseCase,
  DeleteGradoUseCase,
} from '../../application/use-cases';
import { CreateGradoDto, UpdateGradoDto } from '../../application/dto';

@ApiTags('grados')
@ApiBearerAuth()
@Controller('instituciones/:institucionId/academico/grados')
export class GradoController {
  constructor(
    private readonly createGradoUseCase: CreateGradoUseCase,
    private readonly getAllGradosUseCase: GetAllGradosUseCase,
    private readonly getGradoByIdUseCase: GetGradoByIdUseCase,
    private readonly getGradosByNivelUseCase: GetGradosByNivelUseCase,
    private readonly getGradosByAnioAcademicoUseCase: GetGradosByAnioAcademicoUseCase,
    private readonly updateGradoUseCase: UpdateGradoUseCase,
    private readonly deleteGradoUseCase: DeleteGradoUseCase,
  ) {}

  @Post()
  @Auth(UserRole.ADMIN, UserRole.DIRECTOR)
  @ApiOperation({ summary: 'Crear un nuevo grado' })
  create(
    @Body() createGradoDto: CreateGradoDto,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.createGradoUseCase.execute(createGradoDto, institucionId);
  }

  @Get()
  @Auth(
    UserRole.ADMIN,
    UserRole.DIRECTOR,
    UserRole.PROFESOR,
    UserRole.ASISTENTE,
  )
  @ApiOperation({ summary: 'Obtener todos los grados' })
  findAll(@InstitucionIdParam() institucionId: number) {
    return this.getAllGradosUseCase.execute(institucionId);
  }

  @Get('por-nivel/:nivelId')
  @Auth(
    UserRole.ADMIN,
    UserRole.DIRECTOR,
    UserRole.PROFESOR,
    UserRole.ASISTENTE,
  )
  @ApiOperation({ summary: 'Obtener grados por nivel educativo' })
  @ApiParam({ name: 'nivelId', description: 'ID del nivel educativo' })
  findByNivel(
    @Param('nivelId') nivelId: string,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.getGradosByNivelUseCase.execute(+nivelId, institucionId);
  }

  @Get('por-anio-academico/:anioAcademicoId')
  @Auth(
    UserRole.ADMIN,
    UserRole.DIRECTOR,
    UserRole.PROFESOR,
    UserRole.ASISTENTE,
  )
  @ApiOperation({ summary: 'Obtener grados por año académico' })
  @ApiParam({ name: 'anioAcademicoId', description: 'ID del año académico' })
  findByAnioAcademico(
    @Param('anioAcademicoId') anioAcademicoId: string,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.getGradosByAnioAcademicoUseCase.execute(
      +anioAcademicoId,
      institucionId,
    );
  }

  @Get(':id')
  @Auth(
    UserRole.ADMIN,
    UserRole.DIRECTOR,
    UserRole.PROFESOR,
    UserRole.ASISTENTE,
  )
  @ApiOperation({ summary: 'Obtener un grado por ID' })
  @ApiParam({ name: 'id', description: 'ID del grado' })
  findOne(
    @Param('id') id: string,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.getGradoByIdUseCase.execute(+id, institucionId);
  }

  @Patch(':id')
  @Auth(UserRole.ADMIN, UserRole.DIRECTOR)
  @ApiOperation({ summary: 'Actualizar un grado' })
  @ApiParam({ name: 'id', description: 'ID del grado' })
  update(
    @Param('id') id: string,
    @Body() updateGradoDto: UpdateGradoDto,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.updateGradoUseCase.execute(+id, updateGradoDto, institucionId);
  }

  @Delete(':id')
  @Auth(UserRole.ADMIN, UserRole.DIRECTOR)
  @ApiOperation({ summary: 'Eliminar un grado' })
  @ApiParam({ name: 'id', description: 'ID del grado' })
  remove(@Param('id') id: string, @InstitucionIdParam() institucionId: number) {
    return this.deleteGradoUseCase.execute(+id, institucionId);
  }
}
