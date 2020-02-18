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
import { PgroupModule } from 'pgroup/pgroup.module';
import { PgroupEntity } from 'pgroup/pgroup.entity';
import { BudgetController } from '../finance/budget/budget.controller';
import { BudgetEntity } from '../finance/budget/budget.entity';
import { BudgetService } from '../finance/budget/budget.service';

@Module({
  imports: [PgroupModule, TypeOrmModule.forFeature([ProjectEntity, NeedEntity, TaskEntity, UserEntity, KpiEntity, FundraisingEntity, PgroupEntity, BudgetEntity])],
  controllers: [ProjectController, TaskController, KpiController, FundraisingController, BudgetController],
  providers: [ProjectService, TaskService, KpiService, FundraisingService, BudgetService],
  // exports: [FundraisingController]
})
export class ProjectModule { }

