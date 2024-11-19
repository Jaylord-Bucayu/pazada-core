import { Test, TestingModule } from '@nestjs/testing';
import { CardAccountController } from './card-account.controller';
import { CardAccountService } from './card-account.service';

describe('CardAccountController', () => {
  let controller: CardAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardAccountController],
      providers: [CardAccountService],
    }).compile();

    controller = module.get<CardAccountController>(CardAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
