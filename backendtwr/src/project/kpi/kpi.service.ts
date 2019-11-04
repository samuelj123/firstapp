import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from '../../project/project.entity';
import { Repository } from 'typeorm';
import { KpiEntity } from './kpi.entity';

@Injectable()
export class KpiService {
    constructor(
        // @InjectRepository(ProjectEntity) private projrepository: Repository<ProjectEntity>,
        // @InjectRepository(TaskEntity) private taskrepository: Repository<TaskEntity>,
        @InjectRepository(KpiEntity) private kpirepository: Repository<KpiEntity>,
    ) { }

    getone(id: string) {
        return this.kpirepository.findOne({ where: { id } });
    }

    getbyproj(projid: string, t: string) {
        // return this.kpirepository.find({relations: ['project']});
        if (t !== 'true') {
            Logger.log('used where t doesn')
            return this.kpirepository
                .createQueryBuilder('kpi')
                .leftJoin('kpi.project', 'project')
                .where('kpi.project = :projid', { projid })
                .getMany();
            } else {
                Logger.log('used t=true');
                return this.kpirepository
                    .createQueryBuilder('kpi')
                    .leftJoin('kpi.project', 'project')
                    .leftJoinAndSelect('kpi.tasks', 'task')
                    .where('kpi.project = :projid', { projid })
                    .getMany();
        }
    }

    async addone(data: KpiEntity[]) {
        data.forEach(async (value) => {
            const kpi = this.kpirepository.create(value);
            return await this.kpirepository.save(kpi);
        });
    }

    async update(id: string, data: KpiEntity) {
        let kpi = await this.kpirepository.findOne({ where: { id } });
        await this.kpirepository.update({ id }, data);
        kpi = await this.kpirepository.findOne({ where: { id } });
        return kpi;
    }

    async delete(id: string) {
        await this.kpirepository.delete(id);
        return { deleted: true };
    }
}
