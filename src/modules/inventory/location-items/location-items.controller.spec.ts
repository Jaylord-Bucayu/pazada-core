import { Test, TestingModule } from '@nestjs/testing';
import { LocationItemsController } from './location-items.controller';
import { LocationItemsService } from './location-items.service';

describe('LocationItemsController', () => {
  let controller: LocationItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationItemsController],
      providers: [LocationItemsService],
    }).compile();

    controller = module.get<LocationItemsController>(LocationItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
