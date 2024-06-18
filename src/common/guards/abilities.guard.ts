import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AbilityFactory } from 'src/modules/ability/ability.factory';
import { RequiredRule, CHECK_ABILITY } from '../decorators/ability.decorator';
import { ForbiddenError } from '@casl/ability';
// import { ObjectId } from 'mongodb';


@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: AbilityFactory,
  ) {}

  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const rules =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      [];

    const { user } = context.switchToHttp().getRequest();

    // console.log(user)

    // const user = {id: new ObjectId(), role:'ADMIN',lastname:'',firstname:'',middlename:'', email:"", password: 'password',provider:'',fullName:'',createdAt:,updatedAt:Date.now() };
    
    const ability = this.caslAbilityFactory.defineAbility(user);

    try {
      rules.forEach((rule) =>
        ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject),
      );
      return true;
    } catch (error) {
        if(error instanceof ForbiddenError) {
            throw new ForbiddenException(error.message)
        }

    }
  }
}
