import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma/prisma.service';
import { User } from '../../domain/entities/user.entity';
import { Role } from '../../domain/value-objects/role.value-object';
import { IAuthRepository } from '../../domain/repositories/auth.repository.interface';
import { CreateStaffDto } from '../../application/dto/create-staff.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByUsername(
    username: string,
    institucionId: number,
  ): Promise<User | null> {
    const usuario = await this.prisma.usuario.findFirst({
      where: {
        username,
        institucionId,
      },
    });

    if (!usuario) return null;
    return new User({
      id: usuario.id,
      username: usuario.username,
      password: usuario.password,
      personalId: usuario.personalId || undefined,
      estudianteId: usuario.estudianteId || undefined,
      rol: usuario.rol as Role,
      estado: usuario.estado,
      ultimoAcceso: usuario.ultimoAcceso || undefined,
      institucionId: usuario.institucionId,
      createdAt: usuario.createdAt,
      updatedAt: usuario.updatedAt,
    });
  }

  async validateUser(
    username: string,
    password: string,
    institucionId: number,
  ): Promise<User | null> {
    const usuario = await this.findUserByUsername(username, institucionId);

    if (!usuario) return null;

    const isPasswordValid = await bcrypt.compare(password, usuario.password);
    if (!isPasswordValid) return null;

    return usuario;
  }

  async registerStudent(
    studentData: any,
    institucionId: number,
  ): Promise<User> {
    // Generar username basado en nombres y apellidos
    const firstNameInitial = studentData.nombres.charAt(0).toLowerCase();
    const lastname = studentData.apellidos.split(' ')[0].toLowerCase();
    let baseUsername = `${firstNameInitial}${lastname}`;

    // Verificar si ya existe el username
    const existingUsers = await this.prisma.usuario.findMany({
      where: {
        username: {
          startsWith: baseUsername,
        },
        institucionId,
      },
    });

    let username = baseUsername;
    if (existingUsers.length > 0) {
      username = `${baseUsername}${existingUsers.length + 1}`;
    }

    // Encriptar password
    const hashedPassword = await bcrypt.hash(studentData.password, 10);

    // Realizar transacción para crear estudiante y usuario
    const result = await this.prisma.$transaction(async (prisma) => {
      // Crear estudiante
      const estudiante = await prisma.estudiante.create({
        data: {
          dni: studentData.dni,
          nombres: studentData.nombres,
          apellidos: studentData.apellidos,
          fechaNacimiento: studentData.fechaNacimiento,
          genero: studentData.genero,
          direccion: studentData.direccion,
          telefono: studentData.telefono,
          email: studentData.email,
          institucionId,
        },
      }); // Crear usuario asociado
      const usuario = await prisma.usuario.create({
        data: {
          username,
          password: hashedPassword,
          estudianteId: estudiante.id,
          rol: Role.ESTUDIANTE,
          institucionId,
        },
      });

      return { estudiante, usuario };
    });

    return new User({
      id: result.usuario.id,
      username: result.usuario.username,
      password: result.usuario.password,
      estudianteId: result.usuario.estudianteId || undefined,
      personalId: result.usuario.personalId || undefined,
      rol: result.usuario.rol as Role,
      estado: result.usuario.estado,
      ultimoAcceso: result.usuario.ultimoAcceso || undefined,
      institucionId: result.usuario.institucionId,
      createdAt: result.usuario.createdAt,
      updatedAt: result.usuario.updatedAt,
    });
  }
  async createStaffUser(
    staffData: CreateStaffDto,
    institucionId: number,
  ): Promise<User> {
    // Generar username basado en nombres y apellidos
    const firstNameInitial = staffData.nombres.charAt(0).toLowerCase();
    const lastname = staffData.apellidos.split(' ')[0].toLowerCase();
    let baseUsername = `${firstNameInitial}${lastname}`;

    // Verificar si ya existe el username
    const existingUsers = await this.prisma.usuario.findMany({
      where: {
        username: {
          startsWith: baseUsername,
        },
        institucionId,
      },
    });

    let username = baseUsername;
    if (existingUsers.length > 0) {
      username = `${baseUsername}${existingUsers.length + 1}`;
    }

    // Generar salt y hash para la contraseña
    const hashedPassword = await bcrypt.hash(staffData.password, 10);

    // Realizar transacción para crear personal y usuario
    const result = await this.prisma.$transaction(async (prisma) => {
      // Crear registro de personal
      console.log('Datos del personal:', staffData);

      const personal = await prisma.personal.create({
        data: {
          dni: staffData.dni,
          nombres: staffData.nombres,
          apellidos: staffData.apellidos,
          fechaNacimiento: staffData.fechaNacimiento,
          genero: staffData.genero,
          direccion: staffData.direccion,
          telefono: staffData.telefono,
          email: staffData.email,
          profesion: staffData.profesion,
          fechaContratacion: staffData.fechaContratacion || new Date(),
          institucionId: staffData.institucionId,
        },
      });

      // Crear usuario asociado al personal
      const usuario = await prisma.usuario.create({
        data: {
          username,
          password: hashedPassword,
          personalId: personal.id,
          rol: staffData.rol,
          institucionId,
        },
      });

      return { personal, usuario };
    });

    return new User({
      id: result.usuario.id,
      username: result.usuario.username,
      password: result.usuario.password,
      personalId: result.usuario.personalId || undefined,
      estudianteId: result.usuario.estudianteId || undefined,
      rol: result.usuario.rol as Role,
      estado: result.usuario.estado,
      ultimoAcceso: result.usuario.ultimoAcceso || undefined,
      institucionId: result.usuario.institucionId,
      createdAt: result.usuario.createdAt,
      updatedAt: result.usuario.updatedAt,
    });
  }
}
