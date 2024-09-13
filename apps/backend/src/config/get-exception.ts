import { HttpException } from '@nestjs/common';

const exceptionTexts = {
  USER_EXISTS: {
    en: 'User Already Exists',
    ru: '',
  },
  WRONG_PASSWORD: {
    en: 'Wrong password',
    ru: '',
  },
  WRONG_OTP: {
    en: 'Wrong OTP',
    ru: '',
  },
  EXPIRED_OTP: {
    en: 'OTP Expired',
    ru: '',
  },
  USER_NOT_EXISTS: {
    en: 'User not exists',
    ru: '',
  },
  CUSTOMER_NOT_EXISTS: {
    en: 'Customer not exists',
    ru: '',
  },
  NO_USER_EMAIL: {
    en: 'User email not found',
    ru: '',
  },
};

export const getException = (key: keyof typeof exceptionTexts) => {
  return new HttpException(exceptionTexts[key].en, 400);
};
