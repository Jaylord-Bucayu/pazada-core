import { Test, TestingModule } from '@nestjs/testing';
import { LocationItemsService } from './location-items.service';

describe('LocationItemsService', () => {
  let service: LocationItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationItemsService],
    }).compile();

    service = module.get<LocationItemsService>(LocationItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
