import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PgroupEntity } from './pgroup.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NeedEntity } from './need.entity';

@Injectable()
export class PgroupService {
    constructor(
        @InjectRepository(PgroupEntity) private pgrouprepository: Repository<PgroupEntity>,
        @InjectRepository(NeedEntity) private needrepository: Repository<NeedEntity>,
    ) { }

    async new(data: PgroupEntity) {
        const pgp = await this.pgrouprepository.create(data);
        await this.pgrouprepository.save(pgp);
        data.needs.forEach(item => {
            const need = this.needrepository.create({ ...item, pgroup: pgp });
            this.needrepository.save(need);
            return need;
        });
        return data;
    }

    async getall() {
        // return await this.pgrouprepository.find({ relations: ['needs'] });
        return await this.pgrouprepository
            .createQueryBuilder('pgroup')
            .leftJoinAndSelect('pgroup.needs', 'needs')
            .leftJoinAndSelect('needs.project', 'project')
            .getMany();
    }

    async delete(id: string) {
        await this.pgrouprepository.delete(id);
        return { deleted: true };
    }

    async getone(id: string) {
        return await this.pgrouprepository
            .createQueryBuilder('pgroup')
            .where('pgroup.id = :id', { id })
            .leftJoinAndSelect('pgroup.needs', 'needs')
            .getOne();
    }

    async update(data: PgroupEntity) {
        let pgroup = await this.pgrouprepository.findOne({ where: ['id'], relations: ['needs'] });
        await this.pgrouprepository.update({ id: data.id }, data);
        pgroup = await this.pgrouprepository.findOne({ where: ['id'], relations: ['needs'] });
        return pgroup;
    }

    async countryfiltered(country: string) {
        return this.pgrouprepository
        .createQueryBuilder('pgroup')
        .leftJoinAndSelect('pgroup.needs', 'needs')
        .where('pgroup.country = :country', { country: country })
        .getMany();
    }
}
