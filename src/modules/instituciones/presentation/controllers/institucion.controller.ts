import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
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
  async findAll() {
    return await this.getInstitucionesUseCase.execute();
  }

  @Get(':id')
  @Auth(Role.SUPER_ADMIN, Role.ADMIN, Role.DIRECTOR)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.getInstitucionByIdUseCase.execute(id);
  }

  @Post()
  @Auth(Role.SUPER_ADMIN)
  async create(@Body() createInstitucionDto: CreateInstitucionDto) {
    return await this.createInstitucionUseCase.execute(createInstitucionDto);
  }

  @Put(':id')
  @Auth(Role.SUPER_ADMIN, Role.ADMIN)
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
  @Auth(Role.SUPER_ADMIN)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteInstitucionUseCase.execute(id);
  }
}
