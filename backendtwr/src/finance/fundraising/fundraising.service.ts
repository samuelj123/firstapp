import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FundraisingEntity } from './fundraising.entity';
import { ProjectEntity } from '../../project/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FundraisingService {
    constructor(
        @InjectRepository(FundraisingEntity) private frepository: Repository<FundraisingEntity>,
        @InjectRepository(ProjectEntity) private projrepository: Repository<ProjectEntity>,
    ) { }

    getbyproj(projid: string) {
        return this.frepository
            .createQueryBuilder('fundraising')
            .leftJoin('fundraising.project', 'project')
            .where('fundraising.project = :projid', { projid })
            .getMany();
    }

    getone(id: string) {
        return this.frepository.findOne({ where: { id } });
    }

    async newfundraising(data: FundraisingEntity[]) {
        data.forEach(async (value) => {
            const kpi = this.frepository.create(value);
            return await this.frepository.save(kpi);
        });
    }

    async updateFundraising(id: string, data: FundraisingEntity) {
        let fraising = await this.frepository.findOne({ where: { id } });
        await this.frepository.update({ id }, data);
        fraising = await this.frepository.findOne({ where: { id } });
        return fraising;
    }

    deletefraising(frid: string) {
        return this.frepository.delete(frid);
    }
}
