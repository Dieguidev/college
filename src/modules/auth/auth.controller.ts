import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateStudentDto, LoginUserDto } from './dto';

import { Auth, GetUser } from './decorators';

import { UserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create-student')
  createUser(@Body() createStudentDto: CreateStudentDto) {
    return this.authService.registerStudent(createStudentDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user) {
    return this.authService.checkAuthStatus(user);
  }
}
