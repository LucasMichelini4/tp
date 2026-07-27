import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Salon } from './entity/salon.entity.js';
import { Repository } from 'typeorm';
import { SalonDto } from './dto/salon-dto.js';
import { UpdateResult } from 'typeorm/browser';

@Injectable()
export class SalonService {
  constructor(@InjectRepository(Salon) private salonRepository: Repository<Salon>) { }

  async createSalon(salon: SalonDto) {
    const salonExist = await this.findSalon(salon.cuit)

    if (salonExist) {
      throw new ConflictException('El salon con cuit: ' + salon.cuit + ' ya existe')
    } else {
      return await this.salonRepository.save(salon)
    }
  }

  async findSalon(cuit: number) {
    return await this.salonRepository.findOne({ where: { cuit } })
  }

  async findAll() {
    return await this.salonRepository.find({ where: { deleted: false } })
  }

  async findAllDeleted() {
    return await this.salonRepository.find({ where: { deleted: true } })
  }

  async updateSalon(salon: SalonDto) {
    return await this.salonRepository.save(salon);
  }

  async deleteSalon(cuit: number) {
    const salonExist = await this.findSalon(cuit)
    if (!salonExist) {
      throw new ConflictException('El salon con cuit: ' + cuit + ' no existe');
    }
    if (salonExist.deleted) {
      throw new ConflictException('El salon ya esta borrado');
    }
    const rows: UpdateResult = await this.salonRepository.update({ cuit }, { deleted: true });
    return rows.affected == 1;
  }

  async restoreSalon(cuit: number) {
    const salonExist = await this.findSalon(cuit)

    if (!salonExist) {
      throw new ConflictException('El salon con cuit: ' + cuit + ' no existe');
    }

    if (!salonExist.deleted) {
      throw new ConflictException('El salon no esta borrado');
    }

    const rows: UpdateResult = await this.salonRepository.update({ cuit }, { deleted: false });
    return rows.affected == 1;

  }
}
