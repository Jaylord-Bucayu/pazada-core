import { PartialType } from '@nestjs/mapped-types';
import { CreateBranchItemDto } from './create-branch-item.dto';

export class UpdateBranchItemDto extends PartialType(CreateBranchItemDto) {}
