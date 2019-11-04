import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './shared/http-error.filter';
import { ProjectModule } from './project/project.module';
import { PgroupModule } from './pgroup/pgroup.module';
import { FinanceService } from './finance/finance.service';
import { FundraisingController } from './finance/fundraising/fundraising.controller';
// import { FundraisingService } from './finance/fundraising/fundraising.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    ProjectModule,
    PgroupModule],
  controllers: [AppController],
  providers: [
    AppService,
    {provide: APP_FILTER,
    useClass: HttpErrorFilter,
  },
    FinanceService,
    // FundraisingService
  ],
})

export class AppModule {}
