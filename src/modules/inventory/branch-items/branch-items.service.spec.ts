import { Test, TestingModule } from '@nestjs/testing';
import { BranchItemsService } from './branch-items.service';

describe('BranchItemsService', () => {
  let service: BranchItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BranchItemsService],
    }).compile();

    service = module.get<BranchItemsService>(BranchItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
