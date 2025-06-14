import { Institucion } from '../entities/institucion.entity';

export interface IInstitucionRepository {
  findAll(): Promise<Institucion[]>;
  findById(id: number): Promise<Institucion | null>;
  findByRuc(ruc: string): Promise<Institucion | null>;
  create(institucion: Partial<Institucion>): Promise<Institucion>;
  update(id: number, institucion: Partial<Institucion>): Promise<Institucion>;
  delete(id: number): Promise<void>;
}
