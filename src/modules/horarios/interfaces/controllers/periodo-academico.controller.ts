import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from '../../../auth/interfaces/decorators/auth.decorator';
import { Role } from '../../../auth/domain/value-objects/role.value-object';
import { InstitucionIdParam } from '../../../instituciones/interfaces/decorators';
import {
  CreatePeriodoAcademicoUseCase,
  GetAllPeriodosAcademicosUseCase,
  GetPeriodoAcademicoByIdUseCase,
  GetPeriodosByAnioAcademicoUseCase,
  GetCurrentPeriodoAcademicoUseCase,
  UpdatePeriodoAcademicoUseCase,
  DeletePeriodoAcademicoUseCase,
} from '../../application/use-cases';
import {
  CreatePeriodoAcademicoDto,
  UpdatePeriodoAcademicoDto,
} from '../../application/dto';

@ApiTags('periodos académicos')
@ApiBearerAuth()
@Controller('instituciones/:institucionId/horarios/periodos-academicos')
export class PeriodoAcademicoController {
  constructor(
    private readonly createPeriodoAcademicoUseCase: CreatePeriodoAcademicoUseCase,
    private readonly getAllPeriodosAcademicosUseCase: GetAllPeriodosAcademicosUseCase,
    private readonly getPeriodoAcademicoByIdUseCase: GetPeriodoAcademicoByIdUseCase,
    private readonly getPeriodosByAnioAcademicoUseCase: GetPeriodosByAnioAcademicoUseCase,
    private readonly getCurrentPeriodoAcademicoUseCase: GetCurrentPeriodoAcademicoUseCase,
    private readonly updatePeriodoAcademicoUseCase: UpdatePeriodoAcademicoUseCase,
    private readonly deletePeriodoAcademicoUseCase: DeletePeriodoAcademicoUseCase,
  ) {}
  @Post()
  @Auth(Role.ADMIN, Role.DIRECTOR)
  @ApiOperation({ summary: 'Crear un nuevo periodo académico' })
  create(
    @Body() createPeriodoAcademicoDto: CreatePeriodoAcademicoDto,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.createPeriodoAcademicoUseCase.execute(
      createPeriodoAcademicoDto,
      institucionId,
    );
  }
  @Get()
  @Auth(Role.ADMIN, Role.DIRECTOR, Role.PROFESOR, Role.SECRETARIA)
  @ApiOperation({ summary: 'Obtener todos los periodos académicos' })
  findAll(@InstitucionIdParam() institucionId: number) {
    return this.getAllPeriodosAcademicosUseCase.execute(institucionId);
  }
  @Get('actual')
  @Auth(Role.ADMIN, Role.DIRECTOR, Role.PROFESOR, Role.SECRETARIA)
  @ApiOperation({ summary: 'Obtener el periodo académico actual' })
  getCurrent(@InstitucionIdParam() institucionId: number) {
    return this.getCurrentPeriodoAcademicoUseCase.execute(institucionId);
  }
  @Get('por-anio-academico/:anioAcademicoId')
  @Auth(Role.ADMIN, Role.DIRECTOR, Role.PROFESOR, Role.SECRETARIA)
  @ApiOperation({ summary: 'Obtener periodos académicos por año académico' })
  @ApiParam({ name: 'anioAcademicoId', description: 'ID del año académico' })
  findByAnioAcademico(
    @Param('anioAcademicoId') anioAcademicoId: string,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.getPeriodosByAnioAcademicoUseCase.execute(
      +anioAcademicoId,
      institucionId,
    );
  }
  @Get(':id')
  @Auth(Role.ADMIN, Role.DIRECTOR, Role.PROFESOR, Role.SECRETARIA)
  @ApiOperation({ summary: 'Obtener un periodo académico por ID' })
  @ApiParam({ name: 'id', description: 'ID del periodo académico' })
  findOne(
    @Param('id') id: string,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.getPeriodoAcademicoByIdUseCase.execute(+id, institucionId);
  }
  @Patch(':id')
  @Auth(Role.ADMIN, Role.DIRECTOR)
  @ApiOperation({ summary: 'Actualizar un periodo académico' })
  @ApiParam({ name: 'id', description: 'ID del periodo académico' })
  update(
    @Param('id') id: string,
    @Body() updatePeriodoAcademicoDto: UpdatePeriodoAcademicoDto,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.updatePeriodoAcademicoUseCase.execute(
      +id,
      updatePeriodoAcademicoDto,
      institucionId,
    );
  }
  @Delete(':id')
  @Auth(Role.ADMIN, Role.DIRECTOR)
  @ApiOperation({ summary: 'Eliminar un periodo académico' })
  @ApiParam({ name: 'id', description: 'ID del periodo académico' })
  remove(@Param('id') id: string, @InstitucionIdParam() institucionId: number) {
    return this.deletePeriodoAcademicoUseCase.execute(+id, institucionId);
  }
}
