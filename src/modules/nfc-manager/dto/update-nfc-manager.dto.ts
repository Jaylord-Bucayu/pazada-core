import { PartialType } from '@nestjs/mapped-types';
import { CreateNfcManagerDto } from './create-nfc-manager.dto';

export class UpdateNfcManagerDto extends PartialType(CreateNfcManagerDto) {}
