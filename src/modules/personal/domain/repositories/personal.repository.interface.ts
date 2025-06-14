import { Personal } from '../entities/personal.entity';
import { CreatePersonalDto } from '../../application/dto/create-personal.dto';
import { UpdatePersonalDto } from '../../application/dto/update-personal.dto';

export interface IPersonalRepository {
  findAll(institucionId: number): Promise<Personal[]>;
  findById(id: number, institucionId: number): Promise<Personal | null>;
  findByDni(dni: string, institucionId: number): Promise<Personal | null>;
  create(
    createPersonalDto: CreatePersonalDto,
    institucionId: number,
  ): Promise<Personal>;
  update(
    id: number,
    updatePersonalDto: UpdatePersonalDto,
    institucionId: number,
  ): Promise<Personal>;
  remove(id: number, institucionId: number): Promise<void>;
}
