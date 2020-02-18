import { Controller, UseGuards, Post, Body, Get, Delete, Put, Param, Query } from '@nestjs/common';
import { LanguageService } from './language.service';
import { AuthGuard } from 'shared/auth.guard';
import { LanguageEntity } from './language.entity';

@Controller('api/language')
export class LanguageController {
    constructor(private lservice: LanguageService) {}

    @Post()
    @UseGuards(new AuthGuard())
    newlang(@Body() data: LanguageEntity) {
        return this.lservice.new(data);
    }

    @Get()
    @UseGuards(new AuthGuard())
    getall() {
        return this.lservice.getall();
    }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    delete(@Param('id') id: string) {
        return this.lservice.delete(id);
    }

    @Get(':id')
    @UseGuards(new AuthGuard())
    getone(@Param('id') id: string) {
        return this.lservice.getone(id);
    }

    @Put(':id')
    @UseGuards(new AuthGuard())
    putone(@Param('id') id: string, @Body() data: LanguageEntity) {
        return this.lservice.update({ id, ...data });
    }

    @Get('/country')
    @UseGuards(new AuthGuard())
    findbycountry(@Query('name') country: string) {
        return this.lservice.countryfiltered(country);
    }
    
    @Get()
    @UseGuards(new AuthGuard())
    findbyiso(@Query('iso') iso: string) {
        return this.lservice.countryfiltered(iso);
    }
}
