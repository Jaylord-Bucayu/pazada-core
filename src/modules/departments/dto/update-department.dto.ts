import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartmentDto } from './create-department.dto';

export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {
    readonly name?: string;
    readonly actions?: { [key: string]: string }; // Actions with descriptions
    readonly roles?: string[];
    readonly isActive?: boolean;
}
