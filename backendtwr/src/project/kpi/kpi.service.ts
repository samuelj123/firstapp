import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from '../../project/project.entity';
import { Repository } from 'typeorm';
import { KpiEntity } from './kpi.entity';
import { UserEntity } from 'user/user.entity';
import { KpiDTO } from './kpi.dto';

@Injectable()
export class KpiService {
    constructor(
        @InjectRepository(ProjectEntity) private projrepository: Repository<ProjectEntity>,
        // @InjectRepository(TaskEntity) private taskrepository: Repository<TaskEntity>,
        @InjectRepository(KpiEntity) private kpirepository: Repository<KpiEntity>,
        @InjectRepository(UserEntity) private userepository: Repository<UserEntity>,

    ) { }

    getone(id: string) {
        return this.kpirepository.findOne({ where: { id } });
    }

    getbyproj(projid: string) {
			return this.kpirepository
					.createQueryBuilder('kpi')
					.leftJoin('kpi.project', 'project')
					.where('kpi.project = :projid', { projid })
					.leftJoinAndSelect('kpi.pointperson', 'pointperson')
					.getMany();
    }

    async addone(data: KpiDTO[]) {
        data.forEach(async (value) => {
					const pointperson = await this.userepository.findOne( { where: { id: value.pointperson } });
					const project = await this.projrepository.findOne({ where: { id: value.project } });
					const kpi = await this.kpirepository.create({...value, pointperson, project});
					await this.kpirepository.save(kpi);
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
