import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LanguageEntity } from './language.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LanguageService {
    constructor(
        @InjectRepository(LanguageEntity) private lrepository: Repository<LanguageEntity>,
        ) { }

    async new(data: LanguageEntity) {
        const lang = await this.lrepository.create(data);
        await this.lrepository.save(lang);
        return data;
    }
    async getall() {
        return await this.lrepository
            .createQueryBuilder('language')
            .leftJoinAndSelect('language.pgroups', 'pgroups')
            .leftJoinAndSelect('language.users', 'users')
            .getMany();
    }
    async getone(id: string) {
        return this.lrepository.findOne(id);
    }
    async delete(id: string) {
        await this.lrepository.delete(id);
        return { deleted: true };
    }
    async update(data: LanguageEntity) {
        let lang = await this.lrepository.findOne({ where: ['id'] });
        await this.lrepository.update({ id: data.id }, data);
        lang = await this.lrepository.findOne({ where: ['id'], relations: ['pgroups'] });
        return lang;
    }
    async countryfiltered(country: string) {
        return this.lrepository
            .createQueryBuilder('lang')
            .where('lang.country has :country', { country:country })
            .getMany();
    }
    
    async findbyiso(iso: string) {
        return this.lrepository
            .createQueryBuilder('lang')
            .leftJoinAndSelect('lang.needs', 'needs')
            .where('lang.iso = :iso', { iso })
            .getOne();
    }

}
