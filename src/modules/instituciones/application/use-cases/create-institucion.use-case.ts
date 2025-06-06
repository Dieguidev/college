import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateInstitucionDto } from '../dto';
import { IInstitucionesRepository } from '../../domain/repositories/instituciones.repository.interface';
import { INSTITUCIONES_REPOSITORY } from '../../domain/repositories/instituciones-repository.token';

@Injectable()
export class CreateInstitucionUseCase {
  constructor(
    @Inject(INSTITUCIONES_REPOSITORY)
    private readonly institucionesRepository: IInstitucionesRepository,
  ) {}

  async execute(createInstitucionDto: CreateInstitucionDto) {
    try {
      // Verificar si ya existe una institución con el mismo RUC
      const existingInstitucion = await this.institucionesRepository.findByRUC(
        createInstitucionDto.ruc,
      );

      if (existingInstitucion) {
        throw new BadRequestException(
          `Ya existe una institución con el RUC ${createInstitucionDto.ruc}`,
        );
      }

      // Crear la institución con su administrador
      const institucion =
        await this.institucionesRepository.create(createInstitucionDto);

      // Devolver datos relevantes de la institución creada
      return {
        id: institucion.id,
        nombre: institucion.nombre,
        ruc: institucion.ruc,
        direccion: institucion.direccion,
        email: institucion.email,
        telefono: institucion.telefono,
        adminId: institucion.adminId,
        fechaCreacion: institucion.fechaCreacion,
      };
    } catch (error) {
      // Manejar errores específicos de Prisma
      if (error.code === 'P2002') {
        if (error.meta?.target?.includes('ruc')) {
          throw new BadRequestException(
            `Ya existe una institución con el RUC ${createInstitucionDto.ruc}`,
          );
        }
        if (error.meta?.target?.includes('adminDni')) {
          throw new BadRequestException(
            `Ya existe un administrador con el DNI ${createInstitucionDto.adminDni}`,
          );
        }
        if (error.meta?.target?.includes('adminEmail')) {
          throw new BadRequestException(
            `El correo electrónico ${createInstitucionDto.adminEmail} ya está en uso`,
          );
        }
        throw new BadRequestException('Ya existe un registro con esos datos');
      }

      // Si no es un error que ya estemos manejando explícitamente, lo propagamos
      if (error instanceof BadRequestException) {
        throw error;
      }

      console.error(error);
      throw new InternalServerErrorException(
        'Ocurrió un error al crear la institución',
      );
    }
  }
}
