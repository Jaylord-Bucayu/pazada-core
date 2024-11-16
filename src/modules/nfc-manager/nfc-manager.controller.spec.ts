import { Test, TestingModule } from '@nestjs/testing';
import { NfcManagerController } from './nfc-manager.controller';
import { NfcManagerService } from './nfc-manager.service';

describe('NfcManagerController', () => {
  let controller: NfcManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NfcManagerController],
      providers: [NfcManagerService],
    }).compile();

    controller = module.get<NfcManagerController>(NfcManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
