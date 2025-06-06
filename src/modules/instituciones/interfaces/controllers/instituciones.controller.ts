import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateInstitucionDto } from '../../application/dto';
import { CreateInstitucionUseCase } from '../../application/use-cases';
import { Auth } from '../../../auth/interfaces/decorators';
import { Role } from '../../../auth/domain/value-objects/role.value-object';

@Controller('instituciones')
export class InstitucionesController {
  constructor(
    private readonly createInstitucionUseCase: CreateInstitucionUseCase,
  ) {}
  @Post()
  createInstitucion(@Body() createInstitucionDto: CreateInstitucionDto) {
    return this.createInstitucionUseCase.execute(createInstitucionDto);
  }

  // En un entorno de producción, este endpoint debería estar protegido
  // @Auth(Role.SUPER_ADMIN)
}
