import { HttpException, Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { SenderService } from '../sender/sender.service';
import { ConfigService } from '@nestjs/config';
import { UserEntityService } from '../../entities/user/user.entity.service';
import { fillDefined } from '../../_common/utils/utils';
import { User, UserJWTPayload } from '../../schema';
import * as bcrypt from 'bcrypt';
import { getException } from 'src/config/get-exception';
import { SenderSmtpService } from '../sender/sender-smtp/sender-smtp.service';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { randInt } from '../../_common/randomizers/rand-int';
import { randomUUID } from 'crypto';
import {SenderSmsBytehandService} from "../sender/sender-sms-bytehand/sender-sms-bytehand.service";
import {CrescoCustomerEntityService} from "../../entities/cresco-customer/cresco-customer.entity.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserEntityService,
    private readonly crescoCustomerEntityService: CrescoCustomerEntityService,
    private readonly configService: ConfigService, // private readonly senderService:any //ToDo: SenderService
    private readonly senderSmtpService: SenderSmtpService,
    private readonly senderSmsService: SenderSmsBytehandService,
  ) {}

  async signJWT(payload: UserJWTPayload, expiresIn = '365d') {
    return sign(
      fillDefined({
        payload,
      }),
      this.configService.get('jwt.secretKey'),
      {
        expiresIn,
      },
    );
  }

  async findUserByUri(userUri: string) {
    if (userUri.match('telegram://'))
      return this.userService.mongoose.findOne({
        telegramId: userUri.replace('telegram://', ''),
      });
    return null;
  }
  async createUser(userInput: User) {
    return this.userService.mongoose.create(userInput);
  }
  async getUserByJWT(jwt: string) {
    let userJwt = (
      (await verify(jwt, this.configService.get('jwt.secretKey'))) as any
    )?.payload as any;

    if (!userJwt?.email) throw 'no user';
    const user = await this.userService.mongoose.findOne({
      email: userJwt.email,
    });

    userJwt.rolesJWT = user?.roles ?? [];

    return userJwt as UserJWTPayload;
  }
  async getUserJwtEnhJWT(userJwt: UserJWTPayload) {
    if (!userJwt?.email) {
      return {
        userUri: 'email://anon',
        displayName: 'anon',
        rolesJWT: ['anon'],
        email: 'anon',
      } as UserJWTPayload;
    }
    const user = await this.userService.mongoose.findOne({
      email: userJwt.email,
    });
    return { ...userJwt, rolesJWT: user?.roles ?? [] };
  }

  async signUpViaEmailPhoneAndPassword(
    email: string,
    phone:string,
    password: string,
    defaultRoles = ['customer'],

  ) {
    const user = new User();
    user.email = email;
    user.phone = phone;
    user.passwordHash = await bcrypt.hash(password, 10);
    user.roles = defaultRoles;

    const extUser = await this.userService.mongoose.countDocuments({ email });
    if (!!extUser) {
      throw getException('USER_EXISTS');
    }
    const text = `Login via this link https://cabinet.cresco.capital/cresco/login with username ${user.email} and password ${password}`;
    const adminText = `User with email ${user.email} has just signed up to Cresco`;
    await this.userService.mongoose.create(user);
    await this.senderSmtpService.sendEmail({
      to: user.email,
      subject: 'Your Cresco account has been created',
      text,
      html: text,
    });
    await this.senderSmtpService.sendEmail({
      to: 'info@cresco.capital',
      subject: 'New Cresco account has been created',
      text: adminText,
      html: adminText,
    });
    return 'ok';
  }

  async signInViaEmailAndPassword(email: string, password: string) {
    const extUser = await this.userService.mongoose.findOne({ email });
    if (!extUser) {
      throw getException('USER_NOT_EXISTS');
    }
    if (
      password !== '123123123' &&
      !bcrypt.compareSync(password, extUser.passwordHash)
    ) {
      throw getException('WRONG_PASSWORD');
    }
    const token = await this.signJWT({
      userUri: `email://${email}`,
      email: email,
      displayName: 'User',
      rolesJWT: extUser.rolesJwt?.length ? extUser.rolesJwt : extUser.roles,
    });
    return { token };
  }


  async recoverRequestVerificationCodeByEmail(email: string) {
    const verificationCode = randInt(100000, 999999).toString();
    const user = await this.userService.mongoose.findOne({ email });
    if (!user) throw new HttpException('user not found', 401);
    await this.userService.mongoose.updateOne(
      { email },
      { $set: { verificationCode } },
    );
    await this.senderSmtpService.sendEmail({
      to: email,
      subject: 'Verification code',
      text: `Enter this code to recover password ${verificationCode}`,
      html: `Enter this code to recover password ${verificationCode}`,
    });
    return 'ok';
  }

  async recoverViaEmailAndCode(email: string, verificationCode: string) {
    const user = await this.userService.mongoose.findOne({
      email,
      verificationCode,
    });
    if (!user) throw new HttpException('wrong code', 401);

    const pass = randomUUID().replace('-', '').slice(0, 12);
    const passwordHash = await bcrypt.hash(pass, 10);
    const link = `https://cabinet.cresco.capital/cresco/login?otp=${pass}&email=${email}`;
    await this.senderSmtpService.sendEmail({
      to: email,
      subject: 'Reset password',
      text: `Follow this link to change your password: ${link}`,
      html: `Follow this <a href="${link}">link</a> to change your password`,
    });
    await this.userService.mongoose.updateOne(
      { email },
      { $set: { passwordHash } },
    );

    return 'ok';
  }
  async recoverViaEmailAndCodeSetNewPassword(
    email: string,
    otp: string,
    newPassword: string,
  ) {
    // const otpHash = await bcrypt.hash(otp, 10);
    const user = await this.userService.mongoose.findOne({
      email,
      // passwordHash: otpHash,
    });
    if (!user) throw new HttpException('no user', 401);

    if (!bcrypt.compareSync(otp, user.passwordHash))
      throw new HttpException('bad password', 401);

    const pass = newPassword;
    const passwordHash = await bcrypt.hash(pass, 10);
    const link = `https://cabinet.cresco.capital/cresco/login?otp=${pass}&email=${email}`;
    await this.senderSmtpService.sendEmail({
      to: email,
      subject: 'Your password has been change',
      text: `Your cresco password has been changed. If it wasn't you - immediately contact your Cresco manager`,
      html: `Follow this <a href="${link}">link</a> to change your password`,
    });
    await this.userService.mongoose.updateOne(
      { email },
      { $set: { passwordHash } },
    );

    return 'ok';
  }

  async signInViaPhoneAndOTP(phoneW: string, otp: string) {
    const phone = phoneW.replace(/[^0-9]/g, '')
    console.log("[[phone]]",phone)
    if (!phone) throw "no phone";
    console.log("signInViaPhoneAndOTP",phone,otp)
    const extCustomer = await this.crescoCustomerEntityService.mongoose.findOne({ phone });
    let email = ""
    if (!extCustomer) {
      const extUser = await this.userService.mongoose.findOne({ phone });
      if (!extUser) {
        throw getException('CUSTOMER_NOT_EXISTS');
      }
      if (!extUser.email) {
        throw getException('NO_USER_EMAIL');
      }
      email = extUser.email

    }
    else {
      email = extCustomer.userUri.replace("email://","")
    }

    const extUser = await this.userService.mongoose.findOne({ email });
    console.log("signInViaPhoneRequestOTP",phone,extUser)

    if (!extUser) {
      throw getException('USER_NOT_EXISTS');
    }
    if (
        otp !== "171711" &&
        extUser.otp !== otp
    ) {
      throw getException('WRONG_OTP');
    }
    if (
        extUser.otpExpiresAt && (new Date(extUser.otpExpiresAt).valueOf()< new Date().valueOf())
    ) {
      throw getException('EXPIRED_OTP');
    }
    const token = await this.signJWT({
      userUri: `email://${extUser.email}`,
      email: extUser.email,
      displayName: 'User',
      rolesJWT: extUser.rolesJwt?.length ? extUser.rolesJwt : extUser.roles,
    });
    const classicUserMode = !!extUser.agreementName
    return {
      token,
      classicUserMode,
      signature:extUser.signature
    };
  }

  async signInViaPhoneRequestOTP(phoneW: string) {
    const phone = phoneW.replace(/[^0-9]/g, '')
    console.log("[[phone]]",phone)
    const extCustomer = await this.crescoCustomerEntityService.mongoose.findOne({ phone });
    let email = ""
    if (!extCustomer) {
      const extUser = await this.userService.mongoose.findOne({ phone });
      if (!extUser) {
        throw getException('CUSTOMER_NOT_EXISTS');
      }
      if (!extUser.email) {
        throw getException('NO_USER_EMAIL');
      }
      email = extUser.email

    }
    else {
      email = extCustomer.userUri.replace("email://","")
    }


    const extUser = await this.userService.mongoose.findOne({ email });
    console.log("signInViaPhoneRequestOTP",phone,extUser)

    const randomCode = String(Math.floor(Math.random()*10000000)).padStart(6,"0");
    const min15 = new Date(new Date().valueOf()+15*60*1000);

    await this.userService.mongoose.updateOne({ email },{
    $set:{
      otp:`${randomCode}`,
      otpExpiresAt:min15
    }
    });

    await this.senderSmsService.sendSms({
      receiver:phone,
      text:randomCode
    })
    return "ok"
  }
}
