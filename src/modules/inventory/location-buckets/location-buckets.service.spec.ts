import { Test, TestingModule } from '@nestjs/testing';
import { LocationBucketsService } from './location-buckets.service';

describe('LocationBucketsService', () => {
  let service: LocationBucketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationBucketsService],
    }).compile();

    service = module.get<LocationBucketsService>(LocationBucketsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
