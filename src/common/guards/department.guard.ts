import { Injectable, CanActivate, ExecutionContext, ForbiddenException, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../../modules/users/users.service';
import { User } from '../../modules/users/entities/user.entity';

@Injectable()
export class DepartmentGuard implements CanActivate {
  private readonly logger = new Logger(DepartmentGuard.name);

  constructor(private reflector: Reflector, private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredActions = this.reflector.get<string[]>('actions', context.getHandler());
    if (!requiredActions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    try {
      const signInUser = await this.usersService.findOneEmail(user.email);
      if (!signInUser.department || !signInUser.departmentRole) {
        throw new ForbiddenException('User does not have department or role assigned.');
      }

      const departmentId = signInUser.department.toString();
      const role = signInUser.departmentRole;

      const department = await this.usersService.findDepartmentById(departmentId);
      if (!department) {
        throw new ForbiddenException('Invalid department ID.');
      }

      const departmentRole = department.roles.find(dRole => dRole.name === role);
      if (!departmentRole) {
        throw new ForbiddenException('Invalid department role.');
      }

      const departmentActions = departmentRole.actions || [];
      this.logger.log(department);
      this.logger.log(departmentActions);

      const hasAction = requiredActions.every(action => Object.keys(departmentActions).includes(action));

      if (hasAction) {
        return true;
      } else {
        throw new ForbiddenException('You do not have permission to perform this action in your department.');
      }
    } catch (error) {
      this.logger.error(`Error in DepartmentGuard: ${error.message}`);
      throw error;
    }
  }
}
