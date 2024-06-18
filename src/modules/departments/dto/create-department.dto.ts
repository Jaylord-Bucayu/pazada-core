export class CreateDepartmentDto {
    readonly name: string;
  readonly actions: { [key: string]: string }; // Actions with descriptions
  readonly roles: string[];
  readonly description: string;
  readonly isActive: boolean;
}
