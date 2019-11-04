import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { Observable } from 'rxjs';
import { AuthDTO } from './auth.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) { }

    async Allusers() {
        return await this.userRepository.find();
    }

    async register(data: UserEntity) {
        const { email } = data;
        let user = await this.userRepository.findOne({ where: { email } });
        if (user) {
            return 'user already exists';
        }
        user = await this.userRepository.create(data);
        await this.userRepository.save(user);
        return user.toResponseObject();
    }

    async userProfile(id: string) {
        return await this.userRepository.findOne({ where: { id } });
    }

    async updateUser(id: string, data: Partial<UserEntity>) {
        await this.userRepository.update({ id }, data);
        return await this.userRepository.findOne({ id });
    }

    async delete(id: string) {
        await this.userRepository.delete({ id });
        return { deleted: true };
    }

    async findOneByEmail(email: string): Promise<UserEntity> {
        return await this.userRepository.findOne({ where: { email } });
    }

    async logIn(data: AuthDTO) {
        const user: UserEntity = await this.userRepository.findOne({ where: { email: data.email } });
        if (!user) {
            return 'Wrong Email ID';
        } else if (await user.comparePassword(data.password)) {
            return user.toResponseObject();
        } else {
            return 'Wrong Password';
        }
    }
}
