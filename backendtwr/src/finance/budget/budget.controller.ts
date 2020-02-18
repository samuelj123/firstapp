import { Controller, Body, Put, Param, Get, Delete, Post, UseGuards, Query } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { AuthGuard } from '../../shared/auth.guard';
import {BudgetEntity} from 'finance/budget/budget.entity';

@Controller('api/budget')
export class BudgetController {
    constructor(private budgetservice: BudgetService) { }
    
    @Get()
    @UseGuards(new AuthGuard())
    AllProjects() {
        return this.budgetservice.getall();
    }

    @Get('country')
    @UseGuards(new AuthGuard())
    findbycountry(@Query('name') country: string ) {
        return this.budgetservice.countryfiltered(country);
    }

    @Get(':id')
    @UseGuards(new AuthGuard())
    Project(@Param('id') id: string) {
        return this.budgetservice.getone(id)
    }

    @Post()
    @UseGuards(new AuthGuard())
    newproject(@Body() data: BudgetEntity) {
        return this.budgetservice.new(data);
    }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    deleteproject(@Param('id') id: string) {
        return this.budgetservice.delete(id);
    }

    @Put(':id')
    updateproject(@Param('id') id: string, @Body() data: BudgetEntity) {
        return this.budgetservice.update(id, data);
    }
}
