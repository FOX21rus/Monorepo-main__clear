import {
  Injectable,
  CanActivate,
  ExecutionContext,
  createParamDecorator,
  applyDecorators,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';

import { UserRoleEnum } from './user-role.enum';
import { Reflector } from '@nestjs/core';
import { UserJWTPayload } from './user.dto';
import {UserEntityService} from "../../../entities/user/user.entity.service";
// import configuration from "../../config/configuration";

export const getUserFromContext = (context: ExecutionContext) => {
  const request = GqlExecutionContext.create(context).getContext().req;
  return request.user as UserJWTPayload;
};

export const getVarValueFromContext = (
  context: ExecutionContext,
  varPath: string,
) => {
  const request = GqlExecutionContext.create(context).getContext().req;
  let varValue = request.body?.variables;
  varPath.split('.').forEach((p) => {
    varValue = varValue?.[p];
  });

  if (!varValue)
    throw `Wrong decorator usage, no such var path for ${varPath} with vars ${JSON.stringify(
      request.body?.variables,
    )}`;
  if (typeof varValue !== 'string')
    throw 'Wrong decorator usage, var value is not a string';
  return varValue;
};

@Injectable()
export class GlobalAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = GqlExecutionContext.create(context).getContext().req;
    const token = request?.headers?.authorization?.replace('Bearer ', '');
    try {
      if (token) {
        const user = verify(token, process.env.CRESCO_JWT_SECRET_KEY); //FixMe: get it from config (this.configService.get doesnt work here!)
        request.user = user;
      }
    } catch (e) {
      console.log('error GlobalAuthGuard', e);
    }
    // console.log(token);
    return true;
  }
}

export const ReqUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return getUserFromContext(ctx);
  },
);

@Injectable()
class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector,
              private readonly userEntityService:UserEntityService
              ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {
    const role = this.reflector.get<string>('role', context.getHandler());
    const user = getUserFromContext(context) as any;
    const email = user?.payload?.email
    if (!email) return false
    const userEntity = await this.userEntityService.mongoose.findOne({email})
    console.log('userEntity',userEntity,email)
    return userEntity.roles.includes(role)
  }
}

@Injectable()
class OnlyAuthGuard implements CanActivate {
  constructor(private reflector: Reflector,
              private readonly userEntityService:UserEntityService
              ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {
    const user = getUserFromContext(context) as any;
    const email = user?.payload?.email
    if (!email) return false
    const userEntity = await this.userEntityService.mongoose.findOne({email})


    return !!user?.role;
  }
}

@Injectable()
class OnlyTestGuard implements CanActivate {
  constructor(private reflector: Reflector,
              private readonly userEntityService:UserEntityService
              ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const user = getUserFromContext(context);

    // this.userEntityService.mongoose.find()

    return true; //ToDo: restrict
  }
}

export const OnlyAdmin = () => {
  return applyDecorators(SetMetadata('role', 'admin'), UseGuards(RoleGuard));
};
export const OnlySuperAdmin = () => {
  return applyDecorators(SetMetadata('role', 'super_admin'), UseGuards(RoleGuard));
};

export const OnlyAuth = () => {
  return applyDecorators(UseGuards(OnlyAuthGuard));
};
export const OnlyTest = () => {
  return applyDecorators(UseGuards(OnlyTestGuard));
};

export const UserData = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    // console.log(request);
    return request.user?.payload as UserJWTPayload;
  },
);

export const UserPhone = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    return request.user?.userPhone;
  },
);
