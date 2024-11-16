import { Test, TestingModule } from '@nestjs/testing';
import { NfcManagerService } from './nfc-manager.service';

describe('NfcManagerService', () => {
  let service: NfcManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NfcManagerService],
    }).compile();

    service = module.get<NfcManagerService>(NfcManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
