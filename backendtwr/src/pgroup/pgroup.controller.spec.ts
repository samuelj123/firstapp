import { Test, TestingModule } from '@nestjs/testing';
import { PgroupController } from './pgroup.controller';

describe('Pgroup Controller', () => {
  let controller: PgroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PgroupController],
    }).compile();

    controller = module.get<PgroupController>(PgroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
