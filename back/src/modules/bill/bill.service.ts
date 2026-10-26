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

    async findBillIdDni(id: number, dniC: string) {
        return await this.billRepository.findOne({ where: { id, dniC } });
    }

    async findAll() {
        return await this.billRepository.find({ where: { deleted: false } });
    }

    async findAllDeleted() {
        return await this.billRepository.find({ where: { deleted: true } });
    }

    async deleteBill(id : number, dniC : string) {
        const billExists = await this.findBillIdDni(id, dniC);
        if(!billExists) {
            throw new ConflictException('La factura con ID:' + id + 'del cliente con DNI: ' + dniC + ' no existe');
        }
        if (billExists.deleted) {
            throw new ConflictException('La factura ya esta borrada');
        }
        const rows: UpdateResult = await this.billRepository.update({ id }, { deleted: true });
        return rows.affected == 1;
    }

    async restoreBill(id: number, dniC: string) {
        const billExists = await this.findBillIdDni(id, dniC);
        if(!billExists) {
            throw new ConflictException('La factura con ID:' + id + 'del cliente con DNI: ' + dniC + ' no existe');
        }
        if (!billExists.deleted) {
            throw new ConflictException('La factura no esta borrada');
        }
        const rows: UpdateResult = await this.billRepository.update({ id }, { deleted: false });
        return rows.affected == 1;
    }

}
