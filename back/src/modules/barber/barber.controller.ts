import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { BarberService } from './barber.service';
import { ApiTags } from '@nestjs/swagger';
import { BarberDto } from './dto/barber-dto';

@Controller('api/v1/barber')
@ApiTags('Barber')
export class BarberController {
    constructor(private barberService: BarberService) {}

    @Post()
    createBarber(@Body() barber: BarberDto){
        return this.barberService.createBarber(barber);
    }

    @Get('/:dni')
    getBarberByDni(@Param('dni') dni: number) {
        return this.barberService.findBarber(dni);
    }

    @Get()
    getBarber(){
        return this.barberService.findAll();
    }
    
    @Get('filter/deleted')
    getBarberDeleted() {
        return this.barberService.findAllDeleted();
    }

    @Put()
    updateBarber(@Body() barber: BarberDto) {
        return this.barberService.updateBarber(barber);
    }

    @Delete('/:dni')
    deleteBarber(@Param('dni') dni: number) {
        return this.barberService.deleteBarber(dni);
    }

    @Patch('/restore/:dni')
    restoreBarber(@Param('dni') dni: number) {
        return this.barberService.restoreBarber(dni);
    }
}
