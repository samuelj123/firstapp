import { Test, TestingModule } from '@nestjs/testing';
import { FundraisingController } from './fundraising.controller';

describe('Fundraising Controller', () => {
  let controller: FundraisingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FundraisingController],
    }).compile();

    controller = module.get<FundraisingController>(FundraisingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
