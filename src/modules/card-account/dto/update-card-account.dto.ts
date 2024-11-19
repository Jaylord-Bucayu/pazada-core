import { PartialType } from '@nestjs/mapped-types';
import { CreateCardAccountDto } from './create-card-account.dto';

export class UpdateCardAccountDto extends PartialType(CreateCardAccountDto) {}
