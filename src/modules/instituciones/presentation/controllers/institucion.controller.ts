import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import {
  CreateInstitucionDto,
  UpdateInstitucionDto,
} from '../../application/dto';
import {
  CreateInstitucionUseCase,
  UpdateInstitucionUseCase,
  GetInstitucionesUseCase,
  GetInstitucionByIdUseCase,
  DeleteInstitucionUseCase,
} from '../../application/use-cases';

import { Role } from '../../../auth/domain/value-objects';
import { Auth } from 'src/modules/auth/presentation';
import { InstitucionResponseDto } from '../swagger';

@ApiTags('instituciones')
@ApiBearerAuth()
@Controller('instituciones')
export class InstitucionController {
  constructor(
    private readonly createInstitucionUseCase: CreateInstitucionUseCase,
    private readonly updateInstitucionUseCase: UpdateInstitucionUseCase,
    private readonly getInstitucionesUseCase: GetInstitucionesUseCase,
    private readonly getInstitucionByIdUseCase: GetInstitucionByIdUseCase,
    private readonly deleteInstitucionUseCase: DeleteInstitucionUseCase,
  ) {}
  @Get()
  @Auth(Role.SUPER_ADMIN, Role.ADMIN)
  @ApiOperation({
    summary: 'Listar todas las instituciones',
    description:
      'Retorna un listado de todas las instituciones registradas. Requiere rol SUPER_ADMIN o ADMIN.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Listado de instituciones recuperado con éxito',
    type: [InstitucionResponseDto],
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Prohibido - No tiene los permisos necesarios',
  })
  async findAll() {
    return await this.getInstitucionesUseCase.execute();
  }
  @Get(':id')
  @Auth(Role.SUPER_ADMIN, Role.ADMIN, Role.DIRECTOR)
  @ApiOperation({
    summary: 'Obtener una institución por ID',
    description:
      'Retorna los detalles de una institución específica por su ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único de la institución',
    type: Number,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Institución encontrada',
    type: InstitucionResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Institución no encontrada',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Prohibido - No tiene los permisos necesarios',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.getInstitucionByIdUseCase.execute(id);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Auth(Role.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Crear una nueva institución',
    description:
      'Crea una nueva institución educativa. Solo disponible para SUPER_ADMIN.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Institución creada exitosamente',
    type: InstitucionResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Prohibido - No tiene los permisos necesarios',
  })
  async create(@Body() createInstitucionDto: CreateInstitucionDto) {
    return await this.createInstitucionUseCase.execute(createInstitucionDto);
  }
  @Put(':id')
  @Auth(Role.SUPER_ADMIN, Role.ADMIN)
  @ApiOperation({
    summary: 'Actualizar una institución existente',
    description:
      'Actualiza los datos de una institución existente por su ID. Disponible para SUPER_ADMIN y ADMIN.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único de la institución a actualizar',
    type: Number,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Institución actualizada exitosamente',
    type: InstitucionResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Institución no encontrada',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Prohibido - No tiene los permisos necesarios',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInstitucionDto: UpdateInstitucionDto,
  ) {
    return await this.updateInstitucionUseCase.execute(
      id,
      updateInstitucionDto,
    );
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth(Role.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Eliminar una institución',
    description:
      'Elimina una institución existente por su ID. Solo disponible para SUPER_ADMIN.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único de la institución a eliminar',
    type: Number,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Institución eliminada exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Institución no encontrada',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Prohibido - No tiene los permisos necesarios',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteInstitucionUseCase.execute(id);
  }
}
