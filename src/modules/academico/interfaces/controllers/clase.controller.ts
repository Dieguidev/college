// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\interfaces\controllers\clase.controller.ts
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
import { Auth } from '../../../auth/decorators/auth.decorator';
import { UserRole } from '../../../auth/domain/entities/user.entity';
import { InstitucionIdParam } from '../../../instituciones/interfaces/decorators/institucion-id-param.decorator';
import {
  CreateClaseUseCase,
  GetAllClasesUseCase,
  GetClaseByIdUseCase,
  GetClasesByGradoUseCase,
  GetClasesByCursoUseCase,
  GetClasesByProfesorUseCase,
  UpdateClaseUseCase,
  DeleteClaseUseCase,
} from '../../application/use-cases';
import { CreateClaseDto, UpdateClaseDto } from '../../application/dto';

@ApiTags('clases')
@ApiBearerAuth()
@Controller('instituciones/:institucionId/academico/clases')
export class ClaseController {
  constructor(
    private readonly createClaseUseCase: CreateClaseUseCase,
    private readonly getAllClasesUseCase: GetAllClasesUseCase,
    private readonly getClaseByIdUseCase: GetClaseByIdUseCase,
    private readonly getClasesByGradoUseCase: GetClasesByGradoUseCase,
    private readonly getClasesByCursoUseCase: GetClasesByCursoUseCase,
    private readonly getClasesByProfesorUseCase: GetClasesByProfesorUseCase,
    private readonly updateClaseUseCase: UpdateClaseUseCase,
    private readonly deleteClaseUseCase: DeleteClaseUseCase,
  ) {}

  @Post()
  @Auth(UserRole.ADMIN, UserRole.DIRECTOR)
  @ApiOperation({ summary: 'Crear una nueva clase' })
  create(
    @Body() createClaseDto: CreateClaseDto,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.createClaseUseCase.execute(createClaseDto, institucionId);
  }

  @Get()
  @Auth(
    UserRole.ADMIN,
    UserRole.DIRECTOR,
    UserRole.PROFESOR,
    UserRole.ASISTENTE,
  )
  @ApiOperation({ summary: 'Obtener todas las clases' })
  findAll(@InstitucionIdParam() institucionId: number) {
    return this.getAllClasesUseCase.execute(institucionId);
  }

  @Get('por-grado/:gradoId')
  @Auth(
    UserRole.ADMIN,
    UserRole.DIRECTOR,
    UserRole.PROFESOR,
    UserRole.ASISTENTE,
  )
  @ApiOperation({ summary: 'Obtener clases por grado' })
  @ApiParam({ name: 'gradoId', description: 'ID del grado' })
  findByGrado(
    @Param('gradoId') gradoId: string,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.getClasesByGradoUseCase.execute(+gradoId, institucionId);
  }

  @Get('por-curso/:cursoId')
  @Auth(
    UserRole.ADMIN,
    UserRole.DIRECTOR,
    UserRole.PROFESOR,
    UserRole.ASISTENTE,
  )
  @ApiOperation({ summary: 'Obtener clases por curso' })
  @ApiParam({ name: 'cursoId', description: 'ID del curso' })
  findByCurso(
    @Param('cursoId') cursoId: string,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.getClasesByCursoUseCase.execute(+cursoId, institucionId);
  }

  @Get('por-profesor/:profesorId')
  @Auth(
    UserRole.ADMIN,
    UserRole.DIRECTOR,
    UserRole.PROFESOR,
    UserRole.ASISTENTE,
  )
  @ApiOperation({ summary: 'Obtener clases por profesor' })
  @ApiParam({ name: 'profesorId', description: 'ID del profesor (personal)' })
  findByProfesor(
    @Param('profesorId') profesorId: string,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.getClasesByProfesorUseCase.execute(+profesorId, institucionId);
  }

  @Get(':id')
  @Auth(
    UserRole.ADMIN,
    UserRole.DIRECTOR,
    UserRole.PROFESOR,
    UserRole.ASISTENTE,
  )
  @ApiOperation({ summary: 'Obtener una clase por ID' })
  @ApiParam({ name: 'id', description: 'ID de la clase' })
  findOne(
    @Param('id') id: string,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.getClaseByIdUseCase.execute(+id, institucionId);
  }

  @Patch(':id')
  @Auth(UserRole.ADMIN, UserRole.DIRECTOR)
  @ApiOperation({ summary: 'Actualizar una clase' })
  @ApiParam({ name: 'id', description: 'ID de la clase' })
  update(
    @Param('id') id: string,
    @Body() updateClaseDto: UpdateClaseDto,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.updateClaseUseCase.execute(+id, updateClaseDto, institucionId);
  }

  @Delete(':id')
  @Auth(UserRole.ADMIN, UserRole.DIRECTOR)
  @ApiOperation({ summary: 'Eliminar una clase' })
  @ApiParam({ name: 'id', description: 'ID de la clase' })
  remove(@Param('id') id: string, @InstitucionIdParam() institucionId: number) {
    return this.deleteClaseUseCase.execute(+id, institucionId);
  }
}
