import { registerEnumType } from '@nestjs/graphql';

export enum UserRoleEnum {
  'admin' = 'admin',
  'user' = 'user',
}

registerEnumType(UserRoleEnum, { name: 'UserRoleEnum' });
