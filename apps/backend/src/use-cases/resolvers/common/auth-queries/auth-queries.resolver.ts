import { AuthService } from "../../../../services/auth/auth.service";
import { Query, Mutation, Resolver, Args } from "@nestjs/graphql";
import { UserData } from "src/_common/core-nest/guards/user.guard";
import { UserJWTPayload } from "src/schema";
@Resolver()
export class AuthQueries {
  constructor(private readonly authService: AuthService) {}
  @Query()
  async getMe(
    @UserData() user: UserJWTPayload,
    @Args("token") token: string
  ): Promise<UserJWTPayload> {
    if (token) return this.authService.getUserByJWT(token);
    return this.authService.getUserJwtEnhJWT(user);
  }
}
