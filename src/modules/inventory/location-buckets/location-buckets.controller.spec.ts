import { Test, TestingModule } from '@nestjs/testing';
import { LocationBucketsController } from './location-buckets.controller';
import { LocationBucketsService } from './location-buckets.service';

describe('LocationBucketsController', () => {
  let controller: LocationBucketsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationBucketsController],
      providers: [LocationBucketsService],
    }).compile();

    controller = module.get<LocationBucketsController>(LocationBucketsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
