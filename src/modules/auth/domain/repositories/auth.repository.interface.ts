import { User } from '../entities/user.entity';
import { CreateStudentDto } from '../../application/dto/create-student.dto';

export interface IAuthRepository {
  findUserByUsername(
    username: string,
    institucionId: number,
  ): Promise<User | null>;
  validateUser(
    username: string,
    password: string,
    institucionId: number,
  ): Promise<User | null>;
  registerStudent(
    studentData: CreateStudentDto,
    institucionId: number,
  ): Promise<User>;
}
