export class User {
  id: string;

  name: string;

  last_name: string;

  email: string;

  password: string;

  birthdate: Date | null;
  dni: string;

  role: string;

  id_grade: string | null;

  isActive: boolean;

  createdAt: Date;

  updatedAt: Date;
}

export class UserDto {
  user: User;

  token: string;
}
