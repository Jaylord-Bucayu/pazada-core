import { Test, TestingModule } from '@nestjs/testing';
import { CardAccountService } from './card-account.service';

describe('CardAccountService', () => {
  let service: CardAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardAccountService],
    }).compile();

    service = module.get<CardAccountService>(CardAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
