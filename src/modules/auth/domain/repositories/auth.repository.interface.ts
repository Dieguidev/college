import { User } from '../entities/user.entity';

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
  registerStudent(studentData: any, institucionId: number): Promise<User>;
}
