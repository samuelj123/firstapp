import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FundraisingEntity } from './fundraising.entity';
import { ProjectEntity } from '../../project/project.entity';
import { Repository } from 'typeorm';
import { FundraisingDTO } from './fundraising.dto';
import {UserEntity} from 'user/user.entity';

@Injectable()
export class FundraisingService {
    constructor(
        @InjectRepository(FundraisingEntity) private frepository: Repository<FundraisingEntity>,
        @InjectRepository(ProjectEntity) private projrepository: Repository<ProjectEntity>,
        @InjectRepository(UserEntity) private userepository: Repository<UserEntity>,
    ) { }

    getbyproj(projid: string) {
        return this.frepository
					.createQueryBuilder('fundraising')
					.leftJoin('fundraising.project', 'project')
					.leftJoinAndSelect('fundraising.pointperson', 'pointperson')
					.where('fundraising.project = :projid', { projid })
					.getMany();
    }

    getone(id: string) {
        return this.frepository.findOne({ where: { id } });
				return this.frepository
					.createQueryBuilder('fundraising')
					.where('fundraising.id = :id', {id})
					.leftJoinAndSelect('fundraising.project', 'project')
					.leftJoinAndSelect('fundraising.pointperson', 'pointperson')
					.getOne();
    }

    async newfundraising(data: FundraisingDTO[]) {
				data.forEach(async (value) => {
					const user = await this.userepository.findOne({ where: { id: value.pointperson } });
					const project = await this.projrepository.findOne({where: {id: value.project}});
					const fraising = this.frepository.create({...value, pointperson:user, project:project});
					return await this.frepository.save(fraising);
				})
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
