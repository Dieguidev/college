import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  LoginUseCase,
  RegisterStudentUseCase,
  CreateStaffUserUseCase,
} from '../../application/use-cases';
import { Auth, GetUser, AuthRoleDocumentation } from '../decorators';
import {
  CreateStudentDto,
  LoginUserDto,
  CreateStaffDto,
} from '../../application/dto';
import { Role } from '../../domain/value-objects/role.value-object';
import {
  AuthResponseDto,
  StaffResponseDto,
  StudentResponseDto,
} from '../swagger';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerStudentUseCase: RegisterStudentUseCase,
    private readonly createStaffUserUseCase: CreateStaffUserUseCase,
  ) {}
  @Post('create-student')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Registrar un nuevo estudiante',
    description: 'Crea una nueva cuenta de estudiante en el sistema.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Estudiante creado exitosamente',
    type: StudentResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos',
  })
  createUser(@Body() createStudentDto: CreateStudentDto) {
    const { institucionId } = createStudentDto;
    return this.registerStudentUseCase.execute(createStudentDto, institucionId);
  }
  @Post('create-staff')
  @HttpCode(HttpStatus.CREATED)
  // @Auth(Role.SUPER_ADMIN, Role.ADMIN, Role.DIRECTOR)
  @AuthRoleDocumentation()
  @ApiOperation({
    summary: 'Crear un nuevo miembro del staff',
    description:
      'Crea una nueva cuenta para un miembro del personal (profesor, director, administrativo, etc.)',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Miembro del staff creado exitosamente',
    type: StaffResponseDto,
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
  createStaffUser(@Body() createStaffDto: CreateStaffDto) {
    const { institucionId } = createStaffDto;
    return this.createStaffUserUseCase.execute(createStaffDto, institucionId);
  }
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Iniciar sesión',
    description: 'Autentica un usuario y devuelve un token JWT',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Inicio de sesión exitoso',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Credenciales inválidas',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos',
  })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    const { institucionId } = loginUserDto;
    return this.loginUseCase.execute(loginUserDto, institucionId);
  }

  @Get('check-status')
  @Auth()
  @AuthRoleDocumentation()
  @ApiOperation({
    summary: 'Verificar estado de autenticación',
    description:
      'Verifica si el token JWT es válido y devuelve la información del usuario junto con un nuevo token',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'Token válido, devuelve información del usuario y un nuevo token',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Token inválido o expirado',
  })
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
