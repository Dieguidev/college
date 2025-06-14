import { Estudiante } from '../entities/estudiante.entity';
import { CreateEstudianteDto } from '../../application/dto/create-estudiante.dto';
import { UpdateEstudianteDto } from '../../application/dto/update-estudiante.dto';

export interface IEstudiantesRepository {
  findAll(institucionId: number): Promise<Estudiante[]>;
  findById(id: number, institucionId: number): Promise<Estudiante | null>;
  findByDni(dni: string, institucionId: number): Promise<Estudiante | null>;
  create(
    createEstudianteDto: CreateEstudianteDto,
    institucionId: number,
  ): Promise<Estudiante>;
  update(
    id: number,
    updateEstudianteDto: UpdateEstudianteDto,
    institucionId: number,
  ): Promise<Estudiante>;
  remove(id: number, institucionId: number): Promise<void>;
}
