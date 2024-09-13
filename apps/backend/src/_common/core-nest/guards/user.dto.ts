import { UserRoleEnum } from './user-role.enum';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserJWTPayload {
  userEmail: string;
  role: UserRoleEnum;
  customerSlug?: string;
  vendorSlug?: string;
}
