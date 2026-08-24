import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from './entity/bill.entity';
import { Repository, UpdateResult } from 'typeorm';
import { BillDto } from './dto/bill-dto';

@Injectable()
export class BillService {
    constructor(
        @InjectRepository(Bill) private billRepository: Repository<Bill>,
    ) {}

    async createBill(bill: BillDto) {
        const billExists = await this.findBill(bill.id);
        if (billExists) {
            throw new ConflictException(
                'La Factura con el Id: ' + bill.id + ' existe',
            );
        } else{
            return await this.billRepository.save(bill);
        }
    }

    async findBill(id: number) {
        return await this.billRepository.findOne({ where: { id } });
    }

    async findAll() {
        return await this.billRepository.find({ where: { deleted: false } });
    }

    async findAllDeleted() {
        return await this.billRepository.find({ where: { deleted: true } });
    }

    async deleteBill(id: number) {
        const billExists = await this.findBill(id);
        if(!billExists) {
            throw new ConflictException('La factura con el Id: ' + id + ' no existe');
        }
        if (billExists.deleted) {
            throw new ConflictException('La factura ya esta borrada');
        }
        const rows: UpdateResult = await this.billRepository.update({ id }, { deleted: true });
        return rows.affected == 1;
    }

    async restoreBill(id: number) {
        const billExists = await this.findBill(id);
        if(!billExists) {
            throw new ConflictException('La factura con id: ' + id + ' no existe');
        }
        if (!billExists.deleted) {
            throw new ConflictException('La factura no esta borrada');
        }
        const rows: UpdateResult = await this.billRepository.update({ id }, { deleted: false });
        return rows.affected == 1;
    }

}
