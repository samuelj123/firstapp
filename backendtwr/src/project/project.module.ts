import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from './project.controller';
import { ProjectEntity } from './project.entity';
import { ProjectService } from './project.service';
import { NeedEntity } from '../pgroup/need.entity';
import { TaskController } from './task/task.controller';
import { TaskEntity } from './task/task.entity';
import { TaskService } from './task/task.service';
import { UserEntity } from '../user/user.entity';
import { KpiController } from './kpi/kpi.controller';
import { KpiService } from './kpi/kpi.service';
import { KpiEntity } from './kpi/kpi.entity';
import { FundraisingEntity } from '../finance/fundraising/fundraising.entity';
import { FundraisingController } from '../finance/fundraising/fundraising.controller';
import { FundraisingService } from '../finance/fundraising/fundraising.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    ProjectEntity, 
    NeedEntity, 
    TaskEntity, 
    UserEntity, 
    KpiEntity, 
    FundraisingEntity
  ])],
  controllers: [ProjectController, TaskController, KpiController, FundraisingController],
  providers: [ProjectService, TaskService, KpiService, FundraisingService],
  // exports: [FundraisingController]
})
export class ProjectModule { }

