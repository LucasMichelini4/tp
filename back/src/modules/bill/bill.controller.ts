import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillDto } from './dto/bill-dto';


@Controller('api/v1/bill')

export class BillController {
    constructor(private billService: BillService) {}

    @Post()
    createBill(@Body() bill: BillDto){
        return this.billService.createBill(bill);
    }

    @Get(':id')
    getBillById(@Param('id') id: number) {
        return this.billService.findBill(id);
    }

    @Get(':id/:dniC')
    getBillIdDni(
        @Param('id') id : number,
        @Param('dniC') dniC : string){
        return this.billService.findBillIdDni(id, dniC)
    }

    @Get()
    getBill(){
        return this.billService.findAll();
    }

    @Get('filter/deleted')
    getBillDeleted() {
        return this.billService.findAllDeleted();
    }

    @Delete('/:id/:dniC')
    deleteBill(@Param('id') id: number,
               @Param('dniC') dniC : string) {
        return this.billService.deleteBill(id, dniC);
    }

    @Patch('/restore/:id/:dniC')
    restoreBill(@Param('id') id: number,
                @Param('dniC') dniC: string) {
        return this.billService.restoreBill(id, dniC);
    }
}


