import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Barber } from './entity/barber.entity';
import { BarberDto } from './dto/barber-dto';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class BarberService {
    constructor(@InjectRepository(Barber) private barberRepository: Repository<Barber>) {}

    async createBarber(barber: BarberDto) {
        const barberExists = await this.findBarber(barber.dni);
        if (barberExists) {
            throw new ConflictException(
                'El Barber con el DNI: ' + barber.dni + ' existe',);
        } else {
            return await this.barberRepository.save(barber);
        }
    }

    async findBarber(dni: number) {
        return await this.barberRepository.findOne({ where: { dni } });
    }

    async findAll() {
        return await this.barberRepository.find({ where: { deleted: false } });
    }

    async findAllDeleted() { 
        return await this.barberRepository.find({ where: { deleted: true } });
    }

    async updateBarber(barber: BarberDto) {
        return await this.barberRepository.save(barber);
    }

    async deleteBarber(dni: number) {
        const barberExists = await this.findBarber(dni);
        if (!barberExists) {
            throw new ConflictException('El barber con dni: ' + dni + ' no existe');
        }
        if (barberExists.deleted) {
            throw new ConflictException('El barber ya esta borrado');
        }
        const rows: UpdateResult = await this.barberRepository.update({ dni }, { deleted: true});
        return rows.affected == 1;
    }

    async restoreBarber(dni: number) {
        const barberExists = await this.findBarber(dni);
        if (!barberExists) {
            throw new ConflictException('El barber con DNI ' + dni + ' no existe');
        }
        if (!barberExists.deleted) {
            throw new ConflictException('El barber no esta borrado');
        }
        const rows: UpdateResult = await this.barberRepository.update({ dni }, { deleted: false });
        return rows.affected == 1;
    }

}
