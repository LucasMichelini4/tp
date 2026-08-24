import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from './entity/bill.entity';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';

@Module({
    imports: [TypeOrmModule.forFeature([Bill])],
    controllers: [BillController],
    providers: [BillService],
})
export class BillModule {}
