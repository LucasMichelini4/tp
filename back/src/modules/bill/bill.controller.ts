import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BillDto } from './dto/bill-dto';
import { BillService } from './bill.service';

@Controller('api/v1/bill')

export class BillController {
    constructor(private billService: BillService) {}

    @Post()
    createClient(@Body() bill: BillDto){
        return this.billService.createBill(bill);
    }

    @Get(':id')
    getBillById(@Param('id') id: number) {
        return this.billService.findBill(id);
    }

    @Get()
    getBill(){
        return this.billService.findAll();
    }

    @Get('filter/deleted')
    getBillDeleted() {
        return this.billService.findAllDeleted();
    }

    @Delete('/:id')
    deleteBill(@Param('id') id: number) {
        return this.billService.deleteBill(id);
    }

    @Patch('/restore/:id')
    restoreBill(@Param('id') id: number) {
        return this.billService.restoreBill(id);
    }
}


