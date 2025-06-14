import { Apoderado, ApoderadoEstudiante } from '../entities';
import { CreateApoderadoDto } from '../../application/dto/create-apoderado.dto';
import { UpdateApoderadoDto } from '../../application/dto/update-apoderado.dto';
import { AsignarEstudianteDto } from '../../application/dto/asignar-estudiante.dto';

export interface IApoderadosRepository {
  findAll(institucionId: number): Promise<Apoderado[]>;
  findById(id: number, institucionId: number): Promise<Apoderado | null>;
  findByDni(dni: string, institucionId: number): Promise<Apoderado | null>;
  create(
    createApoderadoDto: CreateApoderadoDto,
    institucionId: number,
  ): Promise<Apoderado>;
  update(
    id: number,
    updateApoderadoDto: UpdateApoderadoDto,
    institucionId: number,
  ): Promise<Apoderado>;
  remove(id: number, institucionId: number): Promise<void>;

  // Métodos para la relación apoderado-estudiante
  asignarEstudiante(
    asignarEstudianteDto: AsignarEstudianteDto,
  ): Promise<ApoderadoEstudiante>;
  removerEstudiante(apoderadoId: number, estudianteId: number): Promise<void>;
  getEstudiantesPorApoderado(
    apoderadoId: number,
    institucionId: number,
  ): Promise<any[]>;
  getApoderadosPorEstudiante(
    estudianteId: number,
    institucionId: number,
  ): Promise<any[]>;
}
