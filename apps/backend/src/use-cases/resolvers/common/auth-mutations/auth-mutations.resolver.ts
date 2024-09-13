import { AuthModule } from "../../../../services/auth/auth.module";
import { AuthService } from "../../../../services/auth/auth.service";
import { Query, Mutation, Resolver, Args } from "@nestjs/graphql";
import { UserData } from "src/_common/core-nest/guards/user.guard";
import { UserJWTPayload, AuthResultDto } from "src/schema";
@Resolver()
export class AuthMutations {
  constructor(private readonly authService: AuthService) {}
  @Mutation()
  async signUpViaEmailAndPassword(
    @UserData() user: UserJWTPayload,
    @Args("email") email: string,
    // @Args("phone") phone: string,
    @Args("password") password: string,
    @Args("isAdmin") isAdmin: boolean
  ): Promise<string> {
    return this.authService.signUpViaEmailPhoneAndPassword(
      email,
      "",
      password,
      isAdmin ? ["dismissed"] : ["customer"]
    );
  }

  @Mutation()
  async signUpViaEmailPhoneAndPassword(
      @UserData() user: UserJWTPayload,
      @Args("email") email: string,
      @Args("phone") phone: string,
      @Args("password") password: string,
      @Args("isAdmin") isAdmin: boolean
  ): Promise<string> {
    return this.authService.signUpViaEmailPhoneAndPassword(
        email,
        phone,
        password,
        isAdmin ? ["dismissed"] : ["customer"]
    );
  }
  @Mutation()
  async signInViaEmailAndPassword(
    @UserData() user: UserJWTPayload,
    @Args("email") email: string,
    @Args("password") password: string
  ): Promise<AuthResultDto> {
    return this.authService.signInViaEmailAndPassword(email, password);
  }
  @Mutation()
  async signInViaPhoneAndOTP(
      @Args("phone") phone: string,
      @Args("otp") otp: string
  ): Promise<AuthResultDto> {
    return this.authService.signInViaPhoneAndOTP(phone, otp);
  }

  @Mutation()
  async signInViaPhoneRequestOTP(
      @Args("phone") phone: string
  ): Promise<String> {
    return this.authService.signInViaPhoneRequestOTP(phone);
  }
  @Mutation()
  async recoverRequestVerificationCodeByEmail(
    @UserData() user: UserJWTPayload,
    @Args("email") email: string
  ): Promise<string> {
    return this.authService.recoverRequestVerificationCodeByEmail(email);
  }
  @Mutation()
  async recoverViaEmailAndCode(
    @UserData() user: UserJWTPayload,
    @Args("email") email: string,
    @Args("code") code: string
  ): Promise<string> {
    return this.authService.recoverViaEmailAndCode(email, code);
  }
}
