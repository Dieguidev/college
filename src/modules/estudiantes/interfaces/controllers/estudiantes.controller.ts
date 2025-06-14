import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import {
  CreateEstudianteDto,
  UpdateEstudianteDto,
} from '../../application/dto';
import {
  CreateEstudianteUseCase,
  DeleteEstudianteUseCase,
  GetAllEstudiantesUseCase,
  GetEstudianteByIdUseCase,
  UpdateEstudianteUseCase,
} from '../../application/use-cases';
import { Auth, GetUser } from '../../../auth/interfaces/decorators';
import { Role } from '../../../auth/domain/value-objects/role.value-object';

@Controller('estudiantes')
export class EstudiantesController {
  constructor(
    private readonly createEstudianteUseCase: CreateEstudianteUseCase,
    private readonly getAllEstudiantesUseCase: GetAllEstudiantesUseCase,
    private readonly getEstudianteByIdUseCase: GetEstudianteByIdUseCase,
    private readonly updateEstudianteUseCase: UpdateEstudianteUseCase,
    private readonly deleteEstudianteUseCase: DeleteEstudianteUseCase,
  ) {}

  @Post()
  @Auth(Role.SUPER_ADMIN, Role.ADMIN, Role.DIRECTOR, Role.SECRETARIA)
  createEstudiante(@Body() createEstudianteDto: CreateEstudianteDto) {
    return this.createEstudianteUseCase.execute(createEstudianteDto);
  }

  @Get()
  @Auth(
    Role.SUPER_ADMIN,
    Role.ADMIN,
    Role.DIRECTOR,
    Role.SECRETARIA,
    Role.PROFESOR,
    Role.TUTOR,
  )
  getAllEstudiantes(@GetUser() user) {
    return this.getAllEstudiantesUseCase.execute(user.institucionId);
  }

  @Get(':id')
  @Auth(
    Role.SUPER_ADMIN,
    Role.ADMIN,
    Role.DIRECTOR,
    Role.SECRETARIA,
    Role.PROFESOR,
    Role.TUTOR,
  )
  getEstudianteById(@Param('id', ParseIntPipe) id: number, @GetUser() user) {
    return this.getEstudianteByIdUseCase.execute(id, user.institucionId);
  }

  @Put(':id')
  @Auth(Role.SUPER_ADMIN, Role.ADMIN, Role.DIRECTOR, Role.SECRETARIA)
  updateEstudiante(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEstudianteDto: UpdateEstudianteDto,
  ) {
    return this.updateEstudianteUseCase.execute(id, updateEstudianteDto);
  }

  @Delete(':id')
  @Auth(Role.SUPER_ADMIN, Role.ADMIN, Role.DIRECTOR)
  deleteEstudiante(@Param('id', ParseIntPipe) id: number, @GetUser() user) {
    return this.deleteEstudianteUseCase.execute(id, user.institucionId);
  }
}
