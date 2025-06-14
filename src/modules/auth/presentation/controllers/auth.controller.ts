import { Controller, Get, Post, Body } from '@nestjs/common';
import {
  LoginUseCase,
  RegisterStudentUseCase,
  CreateStaffUserUseCase,
} from '../../application/use-cases';
import { Auth, GetUser } from '../decorators';
import {
  CreateStudentDto,
  LoginUserDto,
  CreateStaffDto,
} from '../../application/dto';
import { Role } from '../../domain/value-objects/role.value-object';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerStudentUseCase: RegisterStudentUseCase,
    private readonly createStaffUserUseCase: CreateStaffUserUseCase,
  ) {}
  @Post('create-student')
  createUser(@Body() createStudentDto: CreateStudentDto) {
    const { institucionId } = createStudentDto;
    return this.registerStudentUseCase.execute(createStudentDto, institucionId);
  }

  @Post('create-staff')
  // @Auth(Role.SUPER_ADMIN, Role.ADMIN, Role.DIRECTOR)
  createStaffUser(@Body() createStaffDto: CreateStaffDto) {
    const { institucionId } = createStaffDto;
    return this.createStaffUserUseCase.execute(createStaffDto, institucionId);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    const { institucionId } = loginUserDto;
    return this.loginUseCase.execute(loginUserDto, institucionId);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user) {
    // Aquí implementaríamos un caso de uso si fuera necesario
    return {
      user,
      token: this.loginUseCase['jwtService'].sign({
        id: user.id,
        username: user.username,
        rol: user.rol,
        institucionId: user.institucionId,
      }),
    };
  }
}
