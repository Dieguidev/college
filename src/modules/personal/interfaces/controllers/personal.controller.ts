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
import { CreatePersonalDto, UpdatePersonalDto } from '../../application/dto';
import {
  CreatePersonalUseCase,
  DeletePersonalUseCase,
  GetAllPersonalUseCase,
  GetPersonalByIdUseCase,
  UpdatePersonalUseCase,
} from '../../application/use-cases';
import { Auth, GetUser } from '../../../auth/interfaces/decorators';
import { Role } from '../../../auth/domain/value-objects/role.value-object';

@Controller('personal')
export class PersonalController {
  constructor(
    private readonly createPersonalUseCase: CreatePersonalUseCase,
    private readonly getAllPersonalUseCase: GetAllPersonalUseCase,
    private readonly getPersonalByIdUseCase: GetPersonalByIdUseCase,
    private readonly updatePersonalUseCase: UpdatePersonalUseCase,
    private readonly deletePersonalUseCase: DeletePersonalUseCase,
  ) {}

  @Post()
  @Auth(Role.SUPER_ADMIN, Role.ADMIN, Role.DIRECTOR)
  createPersonal(@Body() createPersonalDto: CreatePersonalDto) {
    return this.createPersonalUseCase.execute(createPersonalDto);
  }

  @Get()
  @Auth(Role.SUPER_ADMIN, Role.ADMIN, Role.DIRECTOR, Role.SECRETARIA)
  getAllPersonal(@GetUser() user) {
    return this.getAllPersonalUseCase.execute(user.institucionId);
  }

  @Get(':id')
  @Auth(Role.SUPER_ADMIN, Role.ADMIN, Role.DIRECTOR, Role.SECRETARIA)
  getPersonalById(@Param('id', ParseIntPipe) id: number, @GetUser() user) {
    return this.getPersonalByIdUseCase.execute(id, user.institucionId);
  }

  @Put(':id')
  @Auth(Role.SUPER_ADMIN, Role.ADMIN, Role.DIRECTOR)
  updatePersonal(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePersonalDto: UpdatePersonalDto,
  ) {
    return this.updatePersonalUseCase.execute(id, updatePersonalDto);
  }

  @Delete(':id')
  @Auth(Role.SUPER_ADMIN, Role.ADMIN, Role.DIRECTOR)
  deletePersonal(@Param('id', ParseIntPipe) id: number, @GetUser() user) {
    return this.deletePersonalUseCase.execute(id, user.institucionId);
  }
}
