// filepath: g:\PROYECTOS\COLLEGE\BACK\src\modules\academico\interfaces\controllers\nivel.controller.ts
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
  CreateNivelUseCase,
  GetAllNivelesUseCase,
  GetNivelByIdUseCase,
  UpdateNivelUseCase,
  DeleteNivelUseCase,
} from '../../application/use-cases';
import { CreateNivelDto, UpdateNivelDto } from '../../application/dto';

@ApiTags('niveles educativos')
@ApiBearerAuth()
@Controller('instituciones/:institucionId/academico/niveles')
export class NivelController {
  constructor(
    private readonly createNivelUseCase: CreateNivelUseCase,
    private readonly getAllNivelesUseCase: GetAllNivelesUseCase,
    private readonly getNivelByIdUseCase: GetNivelByIdUseCase,
    private readonly updateNivelUseCase: UpdateNivelUseCase,
    private readonly deleteNivelUseCase: DeleteNivelUseCase,
  ) {}

  @Post()
  @Auth(UserRole.ADMIN, UserRole.DIRECTOR)
  @ApiOperation({ summary: 'Crear un nuevo nivel educativo' })
  create(
    @Body() createNivelDto: CreateNivelDto,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.createNivelUseCase.execute(createNivelDto, institucionId);
  }

  @Get()
  @Auth(
    UserRole.ADMIN,
    UserRole.DIRECTOR,
    UserRole.PROFESOR,
    UserRole.ASISTENTE,
  )
  @ApiOperation({ summary: 'Obtener todos los niveles educativos' })
  findAll(@InstitucionIdParam() institucionId: number) {
    return this.getAllNivelesUseCase.execute(institucionId);
  }

  @Get(':id')
  @Auth(
    UserRole.ADMIN,
    UserRole.DIRECTOR,
    UserRole.PROFESOR,
    UserRole.ASISTENTE,
  )
  @ApiOperation({ summary: 'Obtener un nivel educativo por ID' })
  @ApiParam({ name: 'id', description: 'ID del nivel educativo' })
  findOne(
    @Param('id') id: string,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.getNivelByIdUseCase.execute(+id, institucionId);
  }

  @Patch(':id')
  @Auth(UserRole.ADMIN, UserRole.DIRECTOR)
  @ApiOperation({ summary: 'Actualizar un nivel educativo' })
  @ApiParam({ name: 'id', description: 'ID del nivel educativo' })
  update(
    @Param('id') id: string,
    @Body() updateNivelDto: UpdateNivelDto,
    @InstitucionIdParam() institucionId: number,
  ) {
    return this.updateNivelUseCase.execute(+id, updateNivelDto, institucionId);
  }

  @Delete(':id')
  @Auth(UserRole.ADMIN, UserRole.DIRECTOR)
  @ApiOperation({ summary: 'Eliminar un nivel educativo' })
  @ApiParam({ name: 'id', description: 'ID del nivel educativo' })
  remove(@Param('id') id: string, @InstitucionIdParam() institucionId: number) {
    return this.deleteNivelUseCase.execute(+id, institucionId);
  }
}
