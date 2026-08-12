import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entity/service.entity';
import { Repository, UpdateResult } from 'typeorm';
import { ServiceDto } from './dto/service-dto';

@Injectable()
export class ServiceService {
    constructor(@InjectRepository(Service) private serviceRepository: Repository<Service>,) { }

    async createService(service: ServiceDto) {
        const serviceExists = await this.findService(service.id);
        if (serviceExists) {
            throw new ConflictException(
                'El Service con el Id: ' + service.id + ' existe'
            );
        } else {
            return await this.serviceRepository.save(service);
        }
    }

    async findService(id: number) {
        return await this.serviceRepository.findOne({ where: { id } });
    }

    async findAll() {
        return await this.serviceRepository.find({ where: {deleted: false } });
    }

    async findAllDeleted() {
        return await this.serviceRepository.find({ where: {deleted: true } });
    }

    async updateService(service: ServiceDto) {
        return await this.serviceRepository.save(service);
    }

    async deleteService(id: number) {
        const serviceExists = await this.findService(id);
        if (!serviceExists) {
            throw new ConflictException('El service con el ID: ' + id + ' no existe');
        }
        if (serviceExists.deleted) {
            throw new ConflictException('El service ya esta borrado')
        }
        const rows: UpdateResult = await this.serviceRepository.update({ id }, { deleted: true });
        return rows.affected == 1;
    }

    async restoreService(id: number) {
        const serviceExists = await this.findService(id);
        if (!serviceExists) {
            throw new ConflictException('El service con ID: ' + id + ' no existe');
        }
        if (!serviceExists.deleted) {
            throw new ConflictException('El service no esta borrado');
        }
        const rows: UpdateResult = await this.serviceRepository.update({ id }, { deleted: false });
        return rows.affected == 1;
    }
}
