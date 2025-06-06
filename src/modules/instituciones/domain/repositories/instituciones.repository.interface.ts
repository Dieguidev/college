import { Institucion } from '../entities/institucion.entity';
import { CreateInstitucionDto } from '../../application/dto/create-institucion.dto';

export interface IInstitucionesRepository {
  findAll(): Promise<Institucion[]>;
  findById(id: number): Promise<Institucion | null>;
  findByRUC(ruc: string): Promise<Institucion | null>;
  create(createInstitucionDto: CreateInstitucionDto): Promise<Institucion>;
  update(id: number, updateData: Partial<Institucion>): Promise<Institucion>;
  remove(id: number): Promise<void>;
}
