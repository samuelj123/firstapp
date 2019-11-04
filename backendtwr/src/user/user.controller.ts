import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { AuthDTO } from './auth.dto';
import { AuthGuard } from '../shared/auth.guard';
import { User } from './user.decorator';

@Controller('api/user')
export class UserController {

    constructor(private uservice: UserService) { }
    @Get()
    // @UseGuards(new AuthGuard())
    Alluser(@User() user: UserEntity) {
        return this.uservice.Allusers();
    }

    @Post()
    // @UseGuards(new AuthGuard())
    register(@Body() data: UserEntity) {
        return this.uservice.register(data);
    }
    @Get(':id')
    // @UseGuards(new AuthGuard())
    userProfile(@Param('id') id: string) {
        return this.uservice.userProfile(id);
    }

    @Put(':id')
    // @UseGuards(new AuthGuard())
    updateUser(@Param('id') id: string, @Body() data: Partial<UserEntity>) {
        return this.uservice.updateUser(id, data);
    }
    @Delete(':id')
    // @UseGuards(new AuthGuard())
    delete(@Param('id') id: string) {
        return this.uservice.delete(id);
    }

    @Post('login')
    login(@Body() data: AuthDTO) {
        return this.uservice.logIn(data);
    }

}
