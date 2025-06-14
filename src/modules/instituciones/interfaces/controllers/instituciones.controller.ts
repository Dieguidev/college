import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  CreateInstitucionDto,
  UpdateInstitucionDto,
} from '../../application/dto';
import {
  CreateInstitucionUseCase,
  GetAllInstitucionesUseCase,
  GetInstitucionByIdUseCase,
  GetInstitucionByRucUseCase,
  UpdateInstitucionUseCase,
  DeleteInstitucionUseCase,
} from '../../application/use-cases';
import { Auth } from '../../../auth/interfaces/decorators';
import { Role } from '../../../auth/domain/value-objects/role.value-object';

@ApiTags('Instituciones')
@Controller('instituciones')
export class InstitucionesController {
  constructor(
    private readonly createInstitucionUseCase: CreateInstitucionUseCase,
    private readonly getAllInstitucionesUseCase: GetAllInstitucionesUseCase,
    private readonly getInstitucionByIdUseCase: GetInstitucionByIdUseCase,
    private readonly getInstitucionByRucUseCase: GetInstitucionByRucUseCase,
    private readonly updateInstitucionUseCase: UpdateInstitucionUseCase,
    private readonly deleteInstitucionUseCase: DeleteInstitucionUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva institución' })
  @ApiResponse({
    status: 201,
    description: 'La institución ha sido creada exitosamente.',
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  // @Auth(Role.SUPER_ADMIN)
  createInstitucion(@Body() createInstitucionDto: CreateInstitucionDto) {
    return this.createInstitucionUseCase.execute(createInstitucionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las instituciones' })
  @ApiResponse({ status: 200, description: 'Lista de instituciones.' })
  // @Auth(Role.SUPER_ADMIN)
  findAll() {
    return this.getAllInstitucionesUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una institución por ID' })
  @ApiResponse({ status: 200, description: 'Institución encontrada.' })
  @ApiResponse({ status: 404, description: 'Institución no encontrada.' })
  // @Auth(Role.SUPER_ADMIN)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getInstitucionByIdUseCase.execute(id);
  }

  @Get('ruc/:ruc')
  @ApiOperation({ summary: 'Obtener una institución por RUC' })
  @ApiResponse({ status: 200, description: 'Institución encontrada.' })
  @ApiResponse({ status: 404, description: 'Institución no encontrada.' })
  // @Auth(Role.SUPER_ADMIN)
  findByRuc(@Param('ruc') ruc: string) {
    return this.getInstitucionByRucUseCase.execute(ruc);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar información de una institución' })
  @ApiResponse({
    status: 200,
    description: 'Institución actualizada exitosamente.',
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  @ApiResponse({ status: 404, description: 'Institución no encontrada.' })
  // @Auth(Role.SUPER_ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInstitucionDto: UpdateInstitucionDto,
  ) {
    return this.updateInstitucionUseCase.execute(id, updateInstitucionDto);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una institución' })
  @ApiResponse({
    status: 204,
    description: 'Institución eliminada exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Institución no encontrada.' })
  // @Auth(Role.SUPER_ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.deleteInstitucionUseCase.execute(id);
  }
}
