import { Test, TestingModule } from '@nestjs/testing';
import { BranchItemsController } from './branch-items.controller';
import { BranchItemsService } from './branch-items.service';

describe('BranchItemsController', () => {
  let controller: BranchItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BranchItemsController],
      providers: [BranchItemsService],
    }).compile();

    controller = module.get<BranchItemsController>(BranchItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
