import { Module } from '@nestjs/common';
import { PgroupService } from './pgroup.service';
import { PgroupController } from './pgroup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PgroupEntity } from './pgroup.entity';
import { NeedEntity } from './need.entity';
import { LanguageController } from './language/language.controller';
import { LanguageService } from './language/language.service';
import { LanguageEntity } from './language/language.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PgroupEntity, NeedEntity, LanguageEntity])],
  providers: [PgroupService, LanguageService],
  controllers: [PgroupController, LanguageController],
  exports: [PgroupService]
})
export class PgroupModule {}
