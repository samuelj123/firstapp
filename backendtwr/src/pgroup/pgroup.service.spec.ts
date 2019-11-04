import { Test, TestingModule } from '@nestjs/testing';
import { PgroupService } from './pgroup.service';

describe('PgroupService', () => {
  let service: PgroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PgroupService],
    }).compile();

    service = module.get<PgroupService>(PgroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
