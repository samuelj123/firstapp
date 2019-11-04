import { FundraisingEntity } from './fundraising.entity';
import { Controller, Body, Put, Param, Get, Delete, Post, UseGuards, Query } from '@nestjs/common';
import { FundraisingService } from './fundraising.service';
import { AuthGuard } from '../../shared/auth.guard';

@Controller('api/fundraising')
export class FundraisingController {

    constructor(private fservice: FundraisingService) { }


    @Get()
    @UseGuards(new AuthGuard())
    FundraisingByProject(@Query('p') projid: string) {
        return this.fservice.getbyproj(projid);
    }

    @Get(':id')
    @UseGuards(new AuthGuard())
    FundraisingbyId(@Param('id') id: string) {
        return this.fservice.getone(id);
    }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    deleteFundraising(@Param('id') id: string) {
        return this.fservice.deletefraising(id);
    }

    @Post()
    @UseGuards(new AuthGuard())
    newFundraising(@Body() data: FundraisingEntity[]) {
        return this.fservice.newfundraising(data);
    }

    @Put(':id')
    @UseGuards(new AuthGuard())
    updateFundraising(@Body() data: FundraisingEntity, @Param('id') id: string) {
        return this.fservice.updateFundraising(id, data)
    }

}

