// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\interfaces\controllers\curso.controller.ts
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
  CreateCursoUseCase,
  GetAllCursosUseCase,
  GetCursoByIdUseCase,
  UpdateCursoUseCase,
  DeleteCursoUseCase,
} from '../../application/use-cases';
import { CreateCursoDto, UpdateCursoDto } from '../../application/dto';

@ApiTags('cursos')
@ApiBearerAuth()
@Controller('instituciones/:institucionId/academico/cursos')
export class CursoController {
  constructor(
    private readonly createCursoUseCase: CreateCursoUseCase,
    private readonly getAllCursosUseCase: GetAllCursosUseCase,
    private readonly getCursoByIdUseCase: GetCursoByIdUseCase,
    private readonly updateCursoUseCase: UpdateCursoUseCase,
    private readonly deleteCursoUseCase: DeleteCursoUseCase,
  ) {}

  @Post()
  @Auth(UserRole.ADMIN, UserRole.DIRECTOR)
  @ApiOperation({ summary: 'Crear un nuevo curso' })
  create(
    @Body() createCursoDto: CreateCursoDto,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.createCursoUseCase.execute(createCursoDto, institucionId);
  }

  @Get()
  @Auth(
    UserRole.ADMIN,
    UserRole.DIRECTOR,
    UserRole.PROFESOR,
    UserRole.ASISTENTE,
  )
  @ApiOperation({ summary: 'Obtener todos los cursos' })
  findAll(@InstitucionIdParam() institucionId: number) {
    return this.getAllCursosUseCase.execute(institucionId);
  }

  @Get(':id')
  @Auth(
    UserRole.ADMIN,
    UserRole.DIRECTOR,
    UserRole.PROFESOR,
    UserRole.ASISTENTE,
  )
  @ApiOperation({ summary: 'Obtener un curso por ID' })
  @ApiParam({ name: 'id', description: 'ID del curso' })
  findOne(
    @Param('id') id: string,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.getCursoByIdUseCase.execute(+id, institucionId);
  }

  @Patch(':id')
  @Auth(UserRole.ADMIN, UserRole.DIRECTOR)
  @ApiOperation({ summary: 'Actualizar un curso' })
  @ApiParam({ name: 'id', description: 'ID del curso' })
  update(
    @Param('id') id: string,
    @Body() updateCursoDto: UpdateCursoDto,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.updateCursoUseCase.execute(+id, updateCursoDto, institucionId);
  }

  @Delete(':id')
  @Auth(UserRole.ADMIN, UserRole.DIRECTOR)
  @ApiOperation({ summary: 'Eliminar un curso' })
  @ApiParam({ name: 'id', description: 'ID del curso' })
  remove(@Param('id') id: string, @InstitucionIdParam() institucionId: number) {
    return this.deleteCursoUseCase.execute(+id, institucionId);
  }
}
