// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\interfaces\controllers\estudiante-grado.controller.ts
import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
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
  MatricularEstudianteUseCase,
  DesmatricularEstudianteUseCase,
  GetEstudiantesPorGradoUseCase,
  GetGradosPorEstudianteUseCase,
} from '../../application/use-cases';
import { MatricularEstudianteDto } from '../../application/dto';

@ApiTags('matrículas')
@ApiBearerAuth()
@Controller('instituciones/:institucionId/academico/matriculas')
export class EstudianteGradoController {
  constructor(
    private readonly matricularEstudianteUseCase: MatricularEstudianteUseCase,
    private readonly desmatricularEstudianteUseCase: DesmatricularEstudianteUseCase,
    private readonly getEstudiantesPorGradoUseCase: GetEstudiantesPorGradoUseCase,
    private readonly getGradosPorEstudianteUseCase: GetGradosPorEstudianteUseCase,
  ) {}

  @Post()
  @Auth(UserRole.ADMIN, UserRole.DIRECTOR, UserRole.ASISTENTE)
  @ApiOperation({ summary: 'Matricular un estudiante en un grado' })
  matricular(
    @Body() matricularEstudianteDto: MatricularEstudianteDto,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.matricularEstudianteUseCase.execute(
      matricularEstudianteDto,
      institucionId,
    );
  }

  @Delete(':estudianteId/:gradoId')
  @Auth(UserRole.ADMIN, UserRole.DIRECTOR, UserRole.ASISTENTE)
  @ApiOperation({ summary: 'Desmatricular un estudiante de un grado' })
  @ApiParam({ name: 'estudianteId', description: 'ID del estudiante' })
  @ApiParam({ name: 'gradoId', description: 'ID del grado' })
  desmatricular(
    @Param('estudianteId') estudianteId: string,
    @Param('gradoId') gradoId: string,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.desmatricularEstudianteUseCase.execute(
      +estudianteId,
      +gradoId,
      institucionId,
    );
  }

  @Get('por-grado/:gradoId')
  @Auth(
    UserRole.ADMIN,
    UserRole.DIRECTOR,
    UserRole.PROFESOR,
    UserRole.ASISTENTE,
  )
  @ApiOperation({ summary: 'Obtener estudiantes matriculados en un grado' })
  @ApiParam({ name: 'gradoId', description: 'ID del grado' })
  getEstudiantesPorGrado(
    @Param('gradoId') gradoId: string,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.getEstudiantesPorGradoUseCase.execute(+gradoId, institucionId);
  }

  @Get('por-estudiante/:estudianteId')
  @Auth(
    UserRole.ADMIN,
    UserRole.DIRECTOR,
    UserRole.PROFESOR,
    UserRole.ASISTENTE,
  )
  @ApiOperation({
    summary: 'Obtener grados en los que está matriculado un estudiante',
  })
  @ApiParam({ name: 'estudianteId', description: 'ID del estudiante' })
  getGradosPorEstudiante(
    @Param('estudianteId') estudianteId: string,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.getGradosPorEstudianteUseCase.execute(
      +estudianteId,
      institucionId,
    );
  }
}
