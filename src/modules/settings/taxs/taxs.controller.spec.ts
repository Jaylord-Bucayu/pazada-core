import { Test, TestingModule } from '@nestjs/testing';
import { TaxsController } from './taxs.controller';
import { TaxsService } from './taxs.service';

describe('TaxsController', () => {
  let controller: TaxsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxsController],
      providers: [TaxsService],
    }).compile();

    controller = module.get<TaxsController>(TaxsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
