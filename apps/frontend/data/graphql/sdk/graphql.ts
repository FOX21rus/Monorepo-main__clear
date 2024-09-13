import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
import { ClientError } from 'graphql-request/dist/types';
import useSWR, { SWRConfiguration as SWRConfigInterface, Key as SWRKeyInterface } from 'swr';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  JSON: any;
};

export type AuthResultDto = {
  __typename?: 'AuthResultDto';
  classicUserMode?: Maybe<Scalars['Boolean']>;
  signature?: Maybe<Scalars['String']>;
  token: Scalars['String'];
};

export type CrescoCustomer = {
  __typename?: 'CrescoCustomer';
  agreementNo?: Maybe<Scalars['String']>;
  agreementUrl?: Maybe<Array<FileUrl>>;
  crescoTokenBalance?: Maybe<Scalars['Float']>;
  firstName?: Maybe<Scalars['String']>;
  isPassportVerified?: Maybe<Scalars['Boolean']>;
  isPrepared?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  managerFullName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  overallUSDTInvestments?: Maybe<Scalars['Float']>;
  passportScanFiles?: Maybe<Array<FileUrl>>;
  phone?: Maybe<Scalars['String']>;
  signedAgreementUrl?: Maybe<Array<FileUrl>>;
  userUri?: Maybe<Scalars['String']>;
  walletAddress?: Maybe<Scalars['String']>;
};

export type CrescoCustomerAdminInput = {
  agreementNo?: InputMaybe<Scalars['String']>;
  agreementUrl?: InputMaybe<Array<FileUrlInput>>;
  crescoTokenBalance?: InputMaybe<Scalars['Float']>;
  isPassportVerified?: InputMaybe<Scalars['Boolean']>;
  managerFullName?: InputMaybe<Scalars['String']>;
  overallUSDTInvestments?: InputMaybe<Scalars['Float']>;
  userUri?: InputMaybe<Scalars['String']>;
};

export type CrescoCustomerCustomerInput = {
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  middleName?: InputMaybe<Scalars['String']>;
  passportScanFiles?: InputMaybe<Array<FileUrlInput>>;
  phone?: InputMaybe<Scalars['String']>;
  signedAgreementUrl?: InputMaybe<Array<FileUrlInput>>;
  walletAddress?: InputMaybe<Scalars['String']>;
};

export type CrescoDeposit = {
  __typename?: 'CrescoDeposit';
  depositNo?: Maybe<Scalars['String']>;
  finishDate?: Maybe<Scalars['Date']>;
  percentRate?: Maybe<Scalars['Float']>;
  startDate?: Maybe<Scalars['Date']>;
};

export type CrescoDepositInput = {
  depositNo: Scalars['String'];
  finishDate: Scalars['String'];
  percentRate: Scalars['Float'];
  startDate: Scalars['String'];
};

export type CrescoDeposits = {
  __typename?: 'CrescoDeposits';
  name?: Maybe<Scalars['String']>;
  payload?: Maybe<Scalars['JSON']>;
};

export type CrescoExternalCoinRate = {
  __typename?: 'CrescoExternalCoinRate';
  displayName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  rate?: Maybe<Scalars['Float']>;
};

export type CrescoExternalCoinRateHistory = {
  __typename?: 'CrescoExternalCoinRateHistory';
  createdAt?: Maybe<Scalars['Date']>;
  displayName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  rate?: Maybe<Scalars['Float']>;
};

export type CrescoNotification = {
  __typename?: 'CrescoNotification';
  createdAt?: Maybe<Scalars['Date']>;
  cta?: Maybe<Scalars['String']>;
  ctaUrl?: Maybe<Scalars['String']>;
  emotion?: Maybe<Scalars['Int']>;
  isRead?: Maybe<Scalars['Boolean']>;
  text: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  userUri: Scalars['String'];
};

export type CrescoNotificationInput = {
  cta?: InputMaybe<Scalars['String']>;
  ctaUrl?: InputMaybe<Scalars['String']>;
  emotion?: InputMaybe<Scalars['Int']>;
  text: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
  userUri: Scalars['String'];
};

export type CrescoPortfolioState = {
  __typename?: 'CrescoPortfolioState';
  _id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Date']>;
  createdByUserUri?: Maybe<Scalars['String']>;
  crescoTokensOverallAmount?: Maybe<Scalars['Float']>;
  currenciesAmountsHashmap?: Maybe<Scalars['JSON']>;
};

export type CrescoPublication = {
  __typename?: 'CrescoPublication';
  createdAt?: Maybe<Scalars['Date']>;
  id: Scalars['String'];
  imageUrl?: Maybe<Array<FileUrl>>;
  text: Scalars['String'];
  title: Scalars['String'];
};

export type CrescoPublicationInput = {
  id?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Array<FileUrlInput>>;
  text: Scalars['String'];
  title: Scalars['String'];
};

export type CrescoReportFile = {
  __typename?: 'CrescoReportFile';
  fileUrl?: Maybe<Scalars['String']>;
};

export type CrescoTokenRate = {
  __typename?: 'CrescoTokenRate';
  crescoTokensAmount: Scalars['Float'];
  rateUSDT: Scalars['Float'];
  ts: Scalars['Date'];
};

export enum CrescoTokenRatesPeriod {
  All = 'ALL',
  Day = 'DAY',
  Instant = 'INSTANT',
  Month = 'MONTH',
  Month3 = 'MONTH3',
  Week = 'WEEK',
  Year = 'YEAR'
}

export type CrescoTransaction = {
  __typename?: 'CrescoTransaction';
  _id?: Maybe<Scalars['ID']>;
  amountCrescoTokens: Scalars['Float'];
  amountUSDT: Scalars['Float'];
  createdAt: Scalars['Date'];
  fromWallet: Scalars['String'];
  status?: Maybe<CrescoTransactionStatus>;
  toWallet: Scalars['String'];
  transactionType?: Maybe<CrescoTransactionTypeEnum>;
  userUri?: Maybe<Scalars['String']>;
};

export type CrescoTransactionInput = {
  amountUSDT: Scalars['Float'];
  transactionType?: InputMaybe<CrescoTransactionTypeEnum>;
  userUri?: InputMaybe<Scalars['String']>;
};

export enum CrescoTransactionStatus {
  Approved = 'APPROVED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  PreApproved = 'PRE_APPROVED',
  RobotApproved = 'ROBOT_APPROVED'
}

export enum CrescoTransactionTypeEnum {
  ClientBuyTokens = 'CLIENT_BUY_TOKENS',
  ClientSellTokens = 'CLIENT_SELL_TOKENS'
}

export enum CrescoUserRoles {
  Admin = 'admin',
  AdminCustomers = 'admin_customers',
  All = 'all',
  Customer = 'customer',
  Dismissed = 'dismissed',
  ServiceToken = 'service_token',
  SuperAdmin = 'super_admin'
}

export enum FieldTypeEnum {
  CrescoManagerSelector = 'CrescoManagerSelector',
  Dictionary = 'DICTIONARY',
  ExternalObject = 'EXTERNAL_OBJECT',
  FileUrl = 'FILE_URL',
  FileUrls = 'FILE_URLS',
  ManagerSelector = 'MANAGER_SELECTOR',
  Markdown = 'MARKDOWN',
  MarkdownLine = 'MARKDOWN_LINE'
}

export type FileUrl = {
  __typename?: 'FileUrl';
  name: Scalars['String'];
  url: Scalars['String'];
};

export type FileUrlInput = {
  name: Scalars['String'];
  url: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createOrFindUserViaTelegramInitData: Scalars['String'];
  crescoAdminCreateNewPortfolioState: Scalars['String'];
  crescoAdminSendNotification: Scalars['String'];
  crescoAdminSetAdminRoles: Scalars['String'];
  crescoAdminTransactionSetStatus?: Maybe<Scalars['String']>;
  crescoAdminUpsertCustomerProfile: Scalars['String'];
  crescoAdminUpsertPublication: Scalars['String'];
  crescoCustomerClassicRequestFullReport: Scalars['String'];
  crescoCustomerClassicRequestUSDTDeposit: Scalars['String'];
  crescoCustomerClassicRequestWithdrawal: Scalars['String'];
  crescoCustomerTransactionCreate?: Maybe<Scalars['String']>;
  crescoCustomerUpsertMyProfile: Scalars['String'];
  crescoTestInitData?: Maybe<Scalars['String']>;
  recoverRequestVerificationCodeByEmail: Scalars['String'];
  recoverViaEmailAndCode: Scalars['String'];
  signInViaEmailAndPassword: AuthResultDto;
  signInViaPhoneAndOTP: AuthResultDto;
  signInViaPhoneRequestOTP: Scalars['String'];
  signUpViaEmailAndPassword: Scalars['String'];
  signUpViaEmailPhoneAndPassword: Scalars['String'];
};


export type MutationCreateOrFindUserViaTelegramInitDataArgs = {
  telegramInitData: Scalars['String'];
};


export type MutationCrescoAdminCreateNewPortfolioStateArgs = {
  coinBalances: Scalars['JSON'];
  crescoTokensOverallAmount: Scalars['Float'];
};


export type MutationCrescoAdminSendNotificationArgs = {
  input?: InputMaybe<CrescoNotificationInput>;
  isBroadcast?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCrescoAdminSetAdminRolesArgs = {
  roles: Array<Scalars['String']>;
  userUri: Scalars['String'];
};


export type MutationCrescoAdminTransactionSetStatusArgs = {
  status?: InputMaybe<CrescoTransactionStatus>;
  transactionId?: InputMaybe<Scalars['String']>;
};


export type MutationCrescoAdminUpsertCustomerProfileArgs = {
  input?: InputMaybe<CrescoCustomerAdminInput>;
};


export type MutationCrescoAdminUpsertPublicationArgs = {
  input?: InputMaybe<CrescoPublicationInput>;
};


export type MutationCrescoCustomerClassicRequestFullReportArgs = {
  agreementNo: Scalars['String'];
};


export type MutationCrescoCustomerClassicRequestUsdtDepositArgs = {
  agreementNo: Scalars['String'];
  amount: Scalars['Float'];
  walletAddress: Scalars['String'];
};


export type MutationCrescoCustomerClassicRequestWithdrawalArgs = {
  agreementNo: Scalars['String'];
};


export type MutationCrescoCustomerTransactionCreateArgs = {
  amountCrescoTokens: Scalars['Float'];
  customerWallet: Scalars['String'];
  transactionType: CrescoTransactionTypeEnum;
};


export type MutationCrescoCustomerUpsertMyProfileArgs = {
  input?: InputMaybe<CrescoCustomerCustomerInput>;
};


export type MutationRecoverRequestVerificationCodeByEmailArgs = {
  email: Scalars['String'];
};


export type MutationRecoverViaEmailAndCodeArgs = {
  code: Scalars['String'];
  email: Scalars['String'];
};


export type MutationSignInViaEmailAndPasswordArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignInViaPhoneAndOtpArgs = {
  otp: Scalars['String'];
  phone: Scalars['String'];
};


export type MutationSignInViaPhoneRequestOtpArgs = {
  phone: Scalars['String'];
};


export type MutationSignUpViaEmailAndPasswordArgs = {
  email: Scalars['String'];
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  password: Scalars['String'];
};


export type MutationSignUpViaEmailPhoneAndPasswordArgs = {
  email: Scalars['String'];
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  password: Scalars['String'];
  phone: Scalars['String'];
};

export enum MutationStatus {
  Error = 'ERROR',
  Ok = 'OK'
}

export type Query = {
  __typename?: 'Query';
  crescoAdminGetAdminList: Array<User>;
  crescoAdminGetCustomerList: Array<CrescoCustomer>;
  crescoAdminGetCustomerProfile: CrescoCustomer;
  crescoAdminGetLastPortfolioState: CrescoPortfolioState;
  crescoAdminTransactionCheckInEth?: Maybe<Scalars['String']>;
  crescoAdminTransactionList: Array<CrescoTransaction>;
  crescoCheckUserClassicByAgreementNoAndLastName: Scalars['Boolean'];
  crescoCustomerGetCalculatedBalance: Scalars['Float'];
  crescoCustomerGetMyProfile: CrescoCustomer;
  crescoCustomerGetProfitability: Scalars['Float'];
  crescoCustomerHasUnreadNotifications: Scalars['Boolean'];
  crescoCustomerListPublications: Array<CrescoPublication>;
  crescoCustomerMyNotificationsList: Array<CrescoNotification>;
  crescoCustomerTransactionList: Array<CrescoTransaction>;
  crescoGetCrescoTokenRateHistory: Array<CrescoTokenRate>;
  crescoGetCurrentCrescoTokenRate: CrescoTokenRate;
  crescoGetDepositInfoByAgreementNumber?: Maybe<Scalars['JSON']>;
  crescoGetExternalCoinsRates: Array<CrescoExternalCoinRate>;
  crescoGetExternalCoinsRatesHistory: Array<CrescoExternalCoinRateHistory>;
  crescoGetMyDepositInfo?: Maybe<Scalars['JSON']>;
  getMe: UserJwtPayload;
  huobiGetData?: Maybe<Scalars['String']>;
  userCreate?: Maybe<Scalars['String']>;
};


export type QueryCrescoAdminGetCustomerListArgs = {
  userUri?: InputMaybe<Scalars['String']>;
};


export type QueryCrescoAdminGetCustomerProfileArgs = {
  userUri?: InputMaybe<Scalars['String']>;
};


export type QueryCrescoAdminTransactionCheckInEthArgs = {
  transactionId?: InputMaybe<Scalars['String']>;
};


export type QueryCrescoAdminTransactionListArgs = {
  status?: InputMaybe<CrescoTransactionStatus>;
};


export type QueryCrescoCheckUserClassicByAgreementNoAndLastNameArgs = {
  agreementNo: Scalars['String'];
  lastName: Scalars['String'];
};


export type QueryCrescoGetCrescoTokenRateHistoryArgs = {
  forPeriod?: InputMaybe<CrescoTokenRatesPeriod>;
};


export type QueryCrescoGetDepositInfoByAgreementNumberArgs = {
  agreementNo: Scalars['String'];
};


export type QueryCrescoGetExternalCoinsRatesHistoryArgs = {
  limit: Scalars['Int'];
};


export type QueryGetMeArgs = {
  token?: InputMaybe<Scalars['String']>;
};


export type QueryUserCreateArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export enum RandomizerEnum {
  UserId = 'USER_ID'
}

export type ServiceFunctions = {
  __typename?: 'ServiceFunctions';
  crescoRobotCheckEthScanTransaction?: Maybe<Scalars['String']>;
  crescoUpdateCustomerBalance?: Maybe<Scalars['String']>;
  crescoUpdateRates?: Maybe<Scalars['String']>;
};

export type TelegramMessage = {
  __typename?: 'TelegramMessage';
  _id?: Maybe<Scalars['ID']>;
  rawData?: Maybe<Scalars['JSON']>;
  telegramBotName?: Maybe<Scalars['String']>;
  telegramChatId?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  agreementName?: Maybe<Scalars['String']>;
  agreementNames?: Maybe<Array<Scalars['String']>>;
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  emails?: Maybe<Array<Scalars['String']>>;
  otp?: Maybe<Scalars['String']>;
  otpExpiresAt?: Maybe<Scalars['Date']>;
  passwordHash?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  phones?: Maybe<Array<Scalars['String']>>;
  roles?: Maybe<Array<Scalars['String']>>;
  rolesJwt?: Maybe<Array<Scalars['String']>>;
  scope?: Maybe<Scalars['String']>;
  signature?: Maybe<Scalars['String']>;
  telegramId?: Maybe<Scalars['String']>;
  telegramIds?: Maybe<Scalars['String']>;
};

export type UserJwtPayload = {
  __typename?: 'UserJWTPayload';
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  rolesJWT?: Maybe<Array<Scalars['String']>>;
  userUri: Scalars['String'];
};

export type CreateOrFindUserViaTelegramInitDataMutationVariables = Exact<{
  telegramInitData: Scalars['String'];
}>;


export type CreateOrFindUserViaTelegramInitDataMutation = { __typename?: 'Mutation', createOrFindUserViaTelegramInitData: string };

export type CrescoAdminCreateNewPortfolioStateMutationVariables = Exact<{
  coinBalances: Scalars['JSON'];
  crescoTokensOverallAmount: Scalars['Float'];
}>;


export type CrescoAdminCreateNewPortfolioStateMutation = { __typename?: 'Mutation', crescoAdminCreateNewPortfolioState: string };

export type CrescoAdminSendNotificationMutationVariables = Exact<{
  input?: InputMaybe<CrescoNotificationInput>;
  isBroadcast?: InputMaybe<Scalars['Boolean']>;
}>;


export type CrescoAdminSendNotificationMutation = { __typename?: 'Mutation', crescoAdminSendNotification: string };

export type CrescoAdminSetAdminRolesMutationVariables = Exact<{
  roles: Array<Scalars['String']> | Scalars['String'];
  userUri: Scalars['String'];
}>;


export type CrescoAdminSetAdminRolesMutation = { __typename?: 'Mutation', crescoAdminSetAdminRoles: string };

export type CrescoAdminTransactionSetStatusMutationVariables = Exact<{
  status?: InputMaybe<CrescoTransactionStatus>;
  transactionId?: InputMaybe<Scalars['String']>;
}>;


export type CrescoAdminTransactionSetStatusMutation = { __typename?: 'Mutation', crescoAdminTransactionSetStatus?: string | null };

export type CrescoAdminUpsertCustomerProfileMutationVariables = Exact<{
  input?: InputMaybe<CrescoCustomerAdminInput>;
}>;


export type CrescoAdminUpsertCustomerProfileMutation = { __typename?: 'Mutation', crescoAdminUpsertCustomerProfile: string };

export type CrescoAdminUpsertPublicationMutationVariables = Exact<{
  input?: InputMaybe<CrescoPublicationInput>;
}>;


export type CrescoAdminUpsertPublicationMutation = { __typename?: 'Mutation', crescoAdminUpsertPublication: string };

export type CrescoCustomerClassicRequestFullReportMutationVariables = Exact<{
  agreementNo: Scalars['String'];
}>;


export type CrescoCustomerClassicRequestFullReportMutation = { __typename?: 'Mutation', crescoCustomerClassicRequestFullReport: string };

export type CrescoCustomerClassicRequestUsdtDepositMutationVariables = Exact<{
  agreementNo: Scalars['String'];
  amount: Scalars['Float'];
  walletAddress: Scalars['String'];
}>;


export type CrescoCustomerClassicRequestUsdtDepositMutation = { __typename?: 'Mutation', crescoCustomerClassicRequestUSDTDeposit: string };

export type CrescoCustomerClassicRequestWithdrawalMutationVariables = Exact<{
  agreementNo: Scalars['String'];
}>;


export type CrescoCustomerClassicRequestWithdrawalMutation = { __typename?: 'Mutation', crescoCustomerClassicRequestWithdrawal: string };

export type CrescoCustomerTransactionCreateMutationVariables = Exact<{
  amountCrescoTokens: Scalars['Float'];
  customerWallet: Scalars['String'];
  transactionType: CrescoTransactionTypeEnum;
}>;


export type CrescoCustomerTransactionCreateMutation = { __typename?: 'Mutation', crescoCustomerTransactionCreate?: string | null };

export type CrescoCustomerUpsertMyProfileMutationVariables = Exact<{
  input?: InputMaybe<CrescoCustomerCustomerInput>;
}>;


export type CrescoCustomerUpsertMyProfileMutation = { __typename?: 'Mutation', crescoCustomerUpsertMyProfile: string };

export type CrescoTestInitDataMutationVariables = Exact<{ [key: string]: never; }>;


export type CrescoTestInitDataMutation = { __typename?: 'Mutation', crescoTestInitData?: string | null };

export type RecoverRequestVerificationCodeByEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type RecoverRequestVerificationCodeByEmailMutation = { __typename?: 'Mutation', recoverRequestVerificationCodeByEmail: string };

export type RecoverViaEmailAndCodeMutationVariables = Exact<{
  code: Scalars['String'];
  email: Scalars['String'];
}>;


export type RecoverViaEmailAndCodeMutation = { __typename?: 'Mutation', recoverViaEmailAndCode: string };

export type SignInViaEmailAndPasswordMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInViaEmailAndPasswordMutation = { __typename?: 'Mutation', signInViaEmailAndPassword: { __typename?: 'AuthResultDto', classicUserMode?: boolean | null, signature?: string | null, token: string } };

export type SignInViaPhoneAndOtpMutationVariables = Exact<{
  otp: Scalars['String'];
  phone: Scalars['String'];
}>;


export type SignInViaPhoneAndOtpMutation = { __typename?: 'Mutation', signInViaPhoneAndOTP: { __typename?: 'AuthResultDto', classicUserMode?: boolean | null, signature?: string | null, token: string } };

export type SignInViaPhoneRequestOtpMutationVariables = Exact<{
  phone: Scalars['String'];
}>;


export type SignInViaPhoneRequestOtpMutation = { __typename?: 'Mutation', signInViaPhoneRequestOTP: string };

export type SignUpViaEmailAndPasswordMutationVariables = Exact<{
  email: Scalars['String'];
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  password: Scalars['String'];
}>;


export type SignUpViaEmailAndPasswordMutation = { __typename?: 'Mutation', signUpViaEmailAndPassword: string };

export type SignUpViaEmailPhoneAndPasswordMutationVariables = Exact<{
  email: Scalars['String'];
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  password: Scalars['String'];
  phone: Scalars['String'];
}>;


export type SignUpViaEmailPhoneAndPasswordMutation = { __typename?: 'Mutation', signUpViaEmailPhoneAndPassword: string };

export type CrescoAdminGetAdminListQueryVariables = Exact<{ [key: string]: never; }>;


export type CrescoAdminGetAdminListQuery = { __typename?: 'Query', crescoAdminGetAdminList: Array<{ __typename?: 'User', agreementName?: string | null, agreementNames?: Array<string> | null, displayName?: string | null, email?: string | null, emails?: Array<string> | null, otp?: string | null, otpExpiresAt?: any | null, passwordHash?: string | null, phone?: string | null, phones?: Array<string> | null, roles?: Array<string> | null, rolesJwt?: Array<string> | null, scope?: string | null, signature?: string | null, telegramId?: string | null, telegramIds?: string | null }> };

export type CrescoAdminGetCustomerListQueryVariables = Exact<{
  userUri?: InputMaybe<Scalars['String']>;
}>;


export type CrescoAdminGetCustomerListQuery = { __typename?: 'Query', crescoAdminGetCustomerList: Array<{ __typename?: 'CrescoCustomer', agreementNo?: string | null, crescoTokenBalance?: number | null, firstName?: string | null, isPassportVerified?: boolean | null, isPrepared?: boolean | null, lastName?: string | null, managerFullName?: string | null, middleName?: string | null, overallUSDTInvestments?: number | null, phone?: string | null, userUri?: string | null, walletAddress?: string | null, agreementUrl?: Array<{ __typename?: 'FileUrl', name: string, url: string }> | null, passportScanFiles?: Array<{ __typename?: 'FileUrl', name: string, url: string }> | null, signedAgreementUrl?: Array<{ __typename?: 'FileUrl', name: string, url: string }> | null }> };

export type CrescoAdminGetCustomerProfileQueryVariables = Exact<{
  userUri?: InputMaybe<Scalars['String']>;
}>;


export type CrescoAdminGetCustomerProfileQuery = { __typename?: 'Query', crescoAdminGetCustomerProfile: { __typename?: 'CrescoCustomer', agreementNo?: string | null, crescoTokenBalance?: number | null, firstName?: string | null, isPassportVerified?: boolean | null, isPrepared?: boolean | null, lastName?: string | null, managerFullName?: string | null, middleName?: string | null, overallUSDTInvestments?: number | null, phone?: string | null, userUri?: string | null, walletAddress?: string | null, agreementUrl?: Array<{ __typename?: 'FileUrl', name: string, url: string }> | null, passportScanFiles?: Array<{ __typename?: 'FileUrl', name: string, url: string }> | null, signedAgreementUrl?: Array<{ __typename?: 'FileUrl', name: string, url: string }> | null } };

export type CrescoAdminGetLastPortfolioStateQueryVariables = Exact<{ [key: string]: never; }>;


export type CrescoAdminGetLastPortfolioStateQuery = { __typename?: 'Query', crescoAdminGetLastPortfolioState: { __typename?: 'CrescoPortfolioState', _id?: string | null, createdAt?: any | null, createdByUserUri?: string | null, crescoTokensOverallAmount?: number | null, currenciesAmountsHashmap?: any | null } };

export type CrescoAdminTransactionCheckInEthQueryVariables = Exact<{
  transactionId?: InputMaybe<Scalars['String']>;
}>;


export type CrescoAdminTransactionCheckInEthQuery = { __typename?: 'Query', crescoAdminTransactionCheckInEth?: string | null };

export type CrescoAdminTransactionListQueryVariables = Exact<{
  status?: InputMaybe<CrescoTransactionStatus>;
}>;


export type CrescoAdminTransactionListQuery = { __typename?: 'Query', crescoAdminTransactionList: Array<{ __typename?: 'CrescoTransaction', _id?: string | null, amountCrescoTokens: number, amountUSDT: number, createdAt: any, fromWallet: string, status?: CrescoTransactionStatus | null, toWallet: string, transactionType?: CrescoTransactionTypeEnum | null, userUri?: string | null }> };

export type CrescoCheckUserClassicByAgreementNoAndLastNameQueryVariables = Exact<{
  agreementNo: Scalars['String'];
  lastName: Scalars['String'];
}>;


export type CrescoCheckUserClassicByAgreementNoAndLastNameQuery = { __typename?: 'Query', crescoCheckUserClassicByAgreementNoAndLastName: boolean };

export type CrescoCustomerGetCalculatedBalanceQueryVariables = Exact<{ [key: string]: never; }>;


export type CrescoCustomerGetCalculatedBalanceQuery = { __typename?: 'Query', crescoCustomerGetCalculatedBalance: number };

export type CrescoCustomerGetMyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type CrescoCustomerGetMyProfileQuery = { __typename?: 'Query', crescoCustomerGetMyProfile: { __typename?: 'CrescoCustomer', agreementNo?: string | null, crescoTokenBalance?: number | null, firstName?: string | null, isPassportVerified?: boolean | null, isPrepared?: boolean | null, lastName?: string | null, managerFullName?: string | null, middleName?: string | null, overallUSDTInvestments?: number | null, phone?: string | null, userUri?: string | null, walletAddress?: string | null, agreementUrl?: Array<{ __typename?: 'FileUrl', name: string, url: string }> | null, passportScanFiles?: Array<{ __typename?: 'FileUrl', name: string, url: string }> | null, signedAgreementUrl?: Array<{ __typename?: 'FileUrl', name: string, url: string }> | null } };

export type CrescoCustomerGetProfitabilityQueryVariables = Exact<{ [key: string]: never; }>;


export type CrescoCustomerGetProfitabilityQuery = { __typename?: 'Query', crescoCustomerGetProfitability: number };

export type CrescoCustomerHasUnreadNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type CrescoCustomerHasUnreadNotificationsQuery = { __typename?: 'Query', crescoCustomerHasUnreadNotifications: boolean };

export type CrescoCustomerListPublicationsQueryVariables = Exact<{ [key: string]: never; }>;


export type CrescoCustomerListPublicationsQuery = { __typename?: 'Query', crescoCustomerListPublications: Array<{ __typename?: 'CrescoPublication', createdAt?: any | null, id: string, text: string, title: string, imageUrl?: Array<{ __typename?: 'FileUrl', name: string, url: string }> | null }> };

export type CrescoCustomerMyNotificationsListQueryVariables = Exact<{ [key: string]: never; }>;


export type CrescoCustomerMyNotificationsListQuery = { __typename?: 'Query', crescoCustomerMyNotificationsList: Array<{ __typename?: 'CrescoNotification', createdAt?: any | null, cta?: string | null, ctaUrl?: string | null, emotion?: number | null, isRead?: boolean | null, text: string, title?: string | null, userUri: string }> };

export type CrescoCustomerTransactionListQueryVariables = Exact<{ [key: string]: never; }>;


export type CrescoCustomerTransactionListQuery = { __typename?: 'Query', crescoCustomerTransactionList: Array<{ __typename?: 'CrescoTransaction', _id?: string | null, amountCrescoTokens: number, amountUSDT: number, createdAt: any, fromWallet: string, status?: CrescoTransactionStatus | null, toWallet: string, transactionType?: CrescoTransactionTypeEnum | null, userUri?: string | null }> };

export type CrescoGetCrescoTokenRateHistoryQueryVariables = Exact<{
  forPeriod?: InputMaybe<CrescoTokenRatesPeriod>;
}>;


export type CrescoGetCrescoTokenRateHistoryQuery = { __typename?: 'Query', crescoGetCrescoTokenRateHistory: Array<{ __typename?: 'CrescoTokenRate', crescoTokensAmount: number, rateUSDT: number, ts: any }> };

export type CrescoGetCurrentCrescoTokenRateQueryVariables = Exact<{ [key: string]: never; }>;


export type CrescoGetCurrentCrescoTokenRateQuery = { __typename?: 'Query', crescoGetCurrentCrescoTokenRate: { __typename?: 'CrescoTokenRate', crescoTokensAmount: number, rateUSDT: number, ts: any } };

export type CrescoGetDepositInfoByAgreementNumberQueryVariables = Exact<{
  agreementNo: Scalars['String'];
}>;


export type CrescoGetDepositInfoByAgreementNumberQuery = { __typename?: 'Query', crescoGetDepositInfoByAgreementNumber?: any | null };

export type CrescoGetExternalCoinsRatesQueryVariables = Exact<{ [key: string]: never; }>;


export type CrescoGetExternalCoinsRatesQuery = { __typename?: 'Query', crescoGetExternalCoinsRates: Array<{ __typename?: 'CrescoExternalCoinRate', displayName?: string | null, name?: string | null, rate?: number | null }> };

export type CrescoGetExternalCoinsRatesHistoryQueryVariables = Exact<{
  limit: Scalars['Int'];
}>;


export type CrescoGetExternalCoinsRatesHistoryQuery = { __typename?: 'Query', crescoGetExternalCoinsRatesHistory: Array<{ __typename?: 'CrescoExternalCoinRateHistory', createdAt?: any | null, displayName?: string | null, name?: string | null, rate?: number | null }> };

export type CrescoGetMyDepositInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type CrescoGetMyDepositInfoQuery = { __typename?: 'Query', crescoGetMyDepositInfo?: any | null };

export type GetMeQueryVariables = Exact<{
  token?: InputMaybe<Scalars['String']>;
}>;


export type GetMeQuery = { __typename?: 'Query', getMe: { __typename?: 'UserJWTPayload', displayName?: string | null, email?: string | null, rolesJWT?: Array<string> | null, userUri: string } };

export type HuobiGetDataQueryVariables = Exact<{ [key: string]: never; }>;


export type HuobiGetDataQuery = { __typename?: 'Query', huobiGetData?: string | null };

export type UserCreateQueryVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type UserCreateQuery = { __typename?: 'Query', userCreate?: string | null };


export const CreateOrFindUserViaTelegramInitDataDocument = gql`
    mutation createOrFindUserViaTelegramInitData($telegramInitData: String!) {
  createOrFindUserViaTelegramInitData(telegramInitData: $telegramInitData)
}
    `;
export const CrescoAdminCreateNewPortfolioStateDocument = gql`
    mutation crescoAdminCreateNewPortfolioState($coinBalances: JSON!, $crescoTokensOverallAmount: Float!) {
  crescoAdminCreateNewPortfolioState(
    coinBalances: $coinBalances
    crescoTokensOverallAmount: $crescoTokensOverallAmount
  )
}
    `;
export const CrescoAdminSendNotificationDocument = gql`
    mutation crescoAdminSendNotification($input: CrescoNotificationInput, $isBroadcast: Boolean) {
  crescoAdminSendNotification(input: $input, isBroadcast: $isBroadcast)
}
    `;
export const CrescoAdminSetAdminRolesDocument = gql`
    mutation crescoAdminSetAdminRoles($roles: [String!]!, $userUri: String!) {
  crescoAdminSetAdminRoles(roles: $roles, userUri: $userUri)
}
    `;
export const CrescoAdminTransactionSetStatusDocument = gql`
    mutation crescoAdminTransactionSetStatus($status: CrescoTransactionStatus, $transactionId: String) {
  crescoAdminTransactionSetStatus(status: $status, transactionId: $transactionId)
}
    `;
export const CrescoAdminUpsertCustomerProfileDocument = gql`
    mutation crescoAdminUpsertCustomerProfile($input: CrescoCustomerAdminInput) {
  crescoAdminUpsertCustomerProfile(input: $input)
}
    `;
export const CrescoAdminUpsertPublicationDocument = gql`
    mutation crescoAdminUpsertPublication($input: CrescoPublicationInput) {
  crescoAdminUpsertPublication(input: $input)
}
    `;
export const CrescoCustomerClassicRequestFullReportDocument = gql`
    mutation crescoCustomerClassicRequestFullReport($agreementNo: String!) {
  crescoCustomerClassicRequestFullReport(agreementNo: $agreementNo)
}
    `;
export const CrescoCustomerClassicRequestUsdtDepositDocument = gql`
    mutation crescoCustomerClassicRequestUSDTDeposit($agreementNo: String!, $amount: Float!, $walletAddress: String!) {
  crescoCustomerClassicRequestUSDTDeposit(
    agreementNo: $agreementNo
    amount: $amount
    walletAddress: $walletAddress
  )
}
    `;
export const CrescoCustomerClassicRequestWithdrawalDocument = gql`
    mutation crescoCustomerClassicRequestWithdrawal($agreementNo: String!) {
  crescoCustomerClassicRequestWithdrawal(agreementNo: $agreementNo)
}
    `;
export const CrescoCustomerTransactionCreateDocument = gql`
    mutation crescoCustomerTransactionCreate($amountCrescoTokens: Float!, $customerWallet: String!, $transactionType: CrescoTransactionTypeEnum!) {
  crescoCustomerTransactionCreate(
    amountCrescoTokens: $amountCrescoTokens
    customerWallet: $customerWallet
    transactionType: $transactionType
  )
}
    `;
export const CrescoCustomerUpsertMyProfileDocument = gql`
    mutation crescoCustomerUpsertMyProfile($input: CrescoCustomerCustomerInput) {
  crescoCustomerUpsertMyProfile(input: $input)
}
    `;
export const CrescoTestInitDataDocument = gql`
    mutation crescoTestInitData {
  crescoTestInitData
}
    `;
export const RecoverRequestVerificationCodeByEmailDocument = gql`
    mutation recoverRequestVerificationCodeByEmail($email: String!) {
  recoverRequestVerificationCodeByEmail(email: $email)
}
    `;
export const RecoverViaEmailAndCodeDocument = gql`
    mutation recoverViaEmailAndCode($code: String!, $email: String!) {
  recoverViaEmailAndCode(code: $code, email: $email)
}
    `;
export const SignInViaEmailAndPasswordDocument = gql`
    mutation signInViaEmailAndPassword($email: String!, $password: String!) {
  signInViaEmailAndPassword(email: $email, password: $password) {
    classicUserMode
    signature
    token
  }
}
    `;
export const SignInViaPhoneAndOtpDocument = gql`
    mutation signInViaPhoneAndOTP($otp: String!, $phone: String!) {
  signInViaPhoneAndOTP(otp: $otp, phone: $phone) {
    classicUserMode
    signature
    token
  }
}
    `;
export const SignInViaPhoneRequestOtpDocument = gql`
    mutation signInViaPhoneRequestOTP($phone: String!) {
  signInViaPhoneRequestOTP(phone: $phone)
}
    `;
export const SignUpViaEmailAndPasswordDocument = gql`
    mutation signUpViaEmailAndPassword($email: String!, $isAdmin: Boolean, $password: String!) {
  signUpViaEmailAndPassword(email: $email, isAdmin: $isAdmin, password: $password)
}
    `;
export const SignUpViaEmailPhoneAndPasswordDocument = gql`
    mutation signUpViaEmailPhoneAndPassword($email: String!, $isAdmin: Boolean, $password: String!, $phone: String!) {
  signUpViaEmailPhoneAndPassword(
    email: $email
    isAdmin: $isAdmin
    password: $password
    phone: $phone
  )
}
    `;
export const CrescoAdminGetAdminListDocument = gql`
    query crescoAdminGetAdminList {
  crescoAdminGetAdminList {
    agreementName
    agreementNames
    displayName
    email
    emails
    otp
    otpExpiresAt
    passwordHash
    phone
    phones
    roles
    rolesJwt
    scope
    signature
    telegramId
    telegramIds
  }
}
    `;
export const CrescoAdminGetCustomerListDocument = gql`
    query crescoAdminGetCustomerList($userUri: String) {
  crescoAdminGetCustomerList(userUri: $userUri) {
    agreementNo
    agreementUrl {
      name
      url
    }
    crescoTokenBalance
    firstName
    isPassportVerified
    isPrepared
    lastName
    managerFullName
    middleName
    overallUSDTInvestments
    passportScanFiles {
      name
      url
    }
    phone
    signedAgreementUrl {
      name
      url
    }
    userUri
    walletAddress
  }
}
    `;
export const CrescoAdminGetCustomerProfileDocument = gql`
    query crescoAdminGetCustomerProfile($userUri: String) {
  crescoAdminGetCustomerProfile(userUri: $userUri) {
    agreementNo
    agreementUrl {
      name
      url
    }
    crescoTokenBalance
    firstName
    isPassportVerified
    isPrepared
    lastName
    managerFullName
    middleName
    overallUSDTInvestments
    passportScanFiles {
      name
      url
    }
    phone
    signedAgreementUrl {
      name
      url
    }
    userUri
    walletAddress
  }
}
    `;
export const CrescoAdminGetLastPortfolioStateDocument = gql`
    query crescoAdminGetLastPortfolioState {
  crescoAdminGetLastPortfolioState {
    _id
    createdAt
    createdByUserUri
    crescoTokensOverallAmount
    currenciesAmountsHashmap
  }
}
    `;
export const CrescoAdminTransactionCheckInEthDocument = gql`
    query crescoAdminTransactionCheckInEth($transactionId: String) {
  crescoAdminTransactionCheckInEth(transactionId: $transactionId)
}
    `;
export const CrescoAdminTransactionListDocument = gql`
    query crescoAdminTransactionList($status: CrescoTransactionStatus) {
  crescoAdminTransactionList(status: $status) {
    _id
    amountCrescoTokens
    amountUSDT
    createdAt
    fromWallet
    status
    toWallet
    transactionType
    userUri
  }
}
    `;
export const CrescoCheckUserClassicByAgreementNoAndLastNameDocument = gql`
    query crescoCheckUserClassicByAgreementNoAndLastName($agreementNo: String!, $lastName: String!) {
  crescoCheckUserClassicByAgreementNoAndLastName(
    agreementNo: $agreementNo
    lastName: $lastName
  )
}
    `;
export const CrescoCustomerGetCalculatedBalanceDocument = gql`
    query crescoCustomerGetCalculatedBalance {
  crescoCustomerGetCalculatedBalance
}
    `;
export const CrescoCustomerGetMyProfileDocument = gql`
    query crescoCustomerGetMyProfile {
  crescoCustomerGetMyProfile {
    agreementNo
    agreementUrl {
      name
      url
    }
    crescoTokenBalance
    firstName
    isPassportVerified
    isPrepared
    lastName
    managerFullName
    middleName
    overallUSDTInvestments
    passportScanFiles {
      name
      url
    }
    phone
    signedAgreementUrl {
      name
      url
    }
    userUri
    walletAddress
  }
}
    `;
export const CrescoCustomerGetProfitabilityDocument = gql`
    query crescoCustomerGetProfitability {
  crescoCustomerGetProfitability
}
    `;
export const CrescoCustomerHasUnreadNotificationsDocument = gql`
    query crescoCustomerHasUnreadNotifications {
  crescoCustomerHasUnreadNotifications
}
    `;
export const CrescoCustomerListPublicationsDocument = gql`
    query crescoCustomerListPublications {
  crescoCustomerListPublications {
    createdAt
    id
    imageUrl {
      name
      url
    }
    text
    title
  }
}
    `;
export const CrescoCustomerMyNotificationsListDocument = gql`
    query crescoCustomerMyNotificationsList {
  crescoCustomerMyNotificationsList {
    createdAt
    cta
    ctaUrl
    emotion
    isRead
    text
    title
    userUri
  }
}
    `;
export const CrescoCustomerTransactionListDocument = gql`
    query crescoCustomerTransactionList {
  crescoCustomerTransactionList {
    _id
    amountCrescoTokens
    amountUSDT
    createdAt
    fromWallet
    status
    toWallet
    transactionType
    userUri
  }
}
    `;
export const CrescoGetCrescoTokenRateHistoryDocument = gql`
    query crescoGetCrescoTokenRateHistory($forPeriod: CrescoTokenRatesPeriod) {
  crescoGetCrescoTokenRateHistory(forPeriod: $forPeriod) {
    crescoTokensAmount
    rateUSDT
    ts
  }
}
    `;
export const CrescoGetCurrentCrescoTokenRateDocument = gql`
    query crescoGetCurrentCrescoTokenRate {
  crescoGetCurrentCrescoTokenRate {
    crescoTokensAmount
    rateUSDT
    ts
  }
}
    `;
export const CrescoGetDepositInfoByAgreementNumberDocument = gql`
    query crescoGetDepositInfoByAgreementNumber($agreementNo: String!) {
  crescoGetDepositInfoByAgreementNumber(agreementNo: $agreementNo)
}
    `;
export const CrescoGetExternalCoinsRatesDocument = gql`
    query crescoGetExternalCoinsRates {
  crescoGetExternalCoinsRates {
    displayName
    name
    rate
  }
}
    `;
export const CrescoGetExternalCoinsRatesHistoryDocument = gql`
    query crescoGetExternalCoinsRatesHistory($limit: Int!) {
  crescoGetExternalCoinsRatesHistory(limit: $limit) {
    createdAt
    displayName
    name
    rate
  }
}
    `;
export const CrescoGetMyDepositInfoDocument = gql`
    query crescoGetMyDepositInfo {
  crescoGetMyDepositInfo
}
    `;
export const GetMeDocument = gql`
    query getMe($token: String) {
  getMe(token: $token) {
    displayName
    email
    rolesJWT
    userUri
  }
}
    `;
export const HuobiGetDataDocument = gql`
    query huobiGetData {
  huobiGetData
}
    `;
export const UserCreateDocument = gql`
    query userCreate($email: String!, $password: String!) {
  userCreate(email: $email, password: $password)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    createOrFindUserViaTelegramInitData(variables: CreateOrFindUserViaTelegramInitDataMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateOrFindUserViaTelegramInitDataMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateOrFindUserViaTelegramInitDataMutation>(CreateOrFindUserViaTelegramInitDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createOrFindUserViaTelegramInitData', 'mutation');
    },
    crescoAdminCreateNewPortfolioState(variables: CrescoAdminCreateNewPortfolioStateMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoAdminCreateNewPortfolioStateMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoAdminCreateNewPortfolioStateMutation>(CrescoAdminCreateNewPortfolioStateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoAdminCreateNewPortfolioState', 'mutation');
    },
    crescoAdminSendNotification(variables?: CrescoAdminSendNotificationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoAdminSendNotificationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoAdminSendNotificationMutation>(CrescoAdminSendNotificationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoAdminSendNotification', 'mutation');
    },
    crescoAdminSetAdminRoles(variables: CrescoAdminSetAdminRolesMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoAdminSetAdminRolesMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoAdminSetAdminRolesMutation>(CrescoAdminSetAdminRolesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoAdminSetAdminRoles', 'mutation');
    },
    crescoAdminTransactionSetStatus(variables?: CrescoAdminTransactionSetStatusMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoAdminTransactionSetStatusMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoAdminTransactionSetStatusMutation>(CrescoAdminTransactionSetStatusDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoAdminTransactionSetStatus', 'mutation');
    },
    crescoAdminUpsertCustomerProfile(variables?: CrescoAdminUpsertCustomerProfileMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoAdminUpsertCustomerProfileMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoAdminUpsertCustomerProfileMutation>(CrescoAdminUpsertCustomerProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoAdminUpsertCustomerProfile', 'mutation');
    },
    crescoAdminUpsertPublication(variables?: CrescoAdminUpsertPublicationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoAdminUpsertPublicationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoAdminUpsertPublicationMutation>(CrescoAdminUpsertPublicationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoAdminUpsertPublication', 'mutation');
    },
    crescoCustomerClassicRequestFullReport(variables: CrescoCustomerClassicRequestFullReportMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoCustomerClassicRequestFullReportMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoCustomerClassicRequestFullReportMutation>(CrescoCustomerClassicRequestFullReportDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoCustomerClassicRequestFullReport', 'mutation');
    },
    crescoCustomerClassicRequestUSDTDeposit(variables: CrescoCustomerClassicRequestUsdtDepositMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoCustomerClassicRequestUsdtDepositMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoCustomerClassicRequestUsdtDepositMutation>(CrescoCustomerClassicRequestUsdtDepositDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoCustomerClassicRequestUSDTDeposit', 'mutation');
    },
    crescoCustomerClassicRequestWithdrawal(variables: CrescoCustomerClassicRequestWithdrawalMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoCustomerClassicRequestWithdrawalMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoCustomerClassicRequestWithdrawalMutation>(CrescoCustomerClassicRequestWithdrawalDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoCustomerClassicRequestWithdrawal', 'mutation');
    },
    crescoCustomerTransactionCreate(variables: CrescoCustomerTransactionCreateMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoCustomerTransactionCreateMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoCustomerTransactionCreateMutation>(CrescoCustomerTransactionCreateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoCustomerTransactionCreate', 'mutation');
    },
    crescoCustomerUpsertMyProfile(variables?: CrescoCustomerUpsertMyProfileMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoCustomerUpsertMyProfileMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoCustomerUpsertMyProfileMutation>(CrescoCustomerUpsertMyProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoCustomerUpsertMyProfile', 'mutation');
    },
    crescoTestInitData(variables?: CrescoTestInitDataMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoTestInitDataMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoTestInitDataMutation>(CrescoTestInitDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoTestInitData', 'mutation');
    },
    recoverRequestVerificationCodeByEmail(variables: RecoverRequestVerificationCodeByEmailMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RecoverRequestVerificationCodeByEmailMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RecoverRequestVerificationCodeByEmailMutation>(RecoverRequestVerificationCodeByEmailDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'recoverRequestVerificationCodeByEmail', 'mutation');
    },
    recoverViaEmailAndCode(variables: RecoverViaEmailAndCodeMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RecoverViaEmailAndCodeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RecoverViaEmailAndCodeMutation>(RecoverViaEmailAndCodeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'recoverViaEmailAndCode', 'mutation');
    },
    signInViaEmailAndPassword(variables: SignInViaEmailAndPasswordMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SignInViaEmailAndPasswordMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SignInViaEmailAndPasswordMutation>(SignInViaEmailAndPasswordDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'signInViaEmailAndPassword', 'mutation');
    },
    signInViaPhoneAndOTP(variables: SignInViaPhoneAndOtpMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SignInViaPhoneAndOtpMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SignInViaPhoneAndOtpMutation>(SignInViaPhoneAndOtpDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'signInViaPhoneAndOTP', 'mutation');
    },
    signInViaPhoneRequestOTP(variables: SignInViaPhoneRequestOtpMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SignInViaPhoneRequestOtpMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SignInViaPhoneRequestOtpMutation>(SignInViaPhoneRequestOtpDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'signInViaPhoneRequestOTP', 'mutation');
    },
    signUpViaEmailAndPassword(variables: SignUpViaEmailAndPasswordMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SignUpViaEmailAndPasswordMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SignUpViaEmailAndPasswordMutation>(SignUpViaEmailAndPasswordDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'signUpViaEmailAndPassword', 'mutation');
    },
    signUpViaEmailPhoneAndPassword(variables: SignUpViaEmailPhoneAndPasswordMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SignUpViaEmailPhoneAndPasswordMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SignUpViaEmailPhoneAndPasswordMutation>(SignUpViaEmailPhoneAndPasswordDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'signUpViaEmailPhoneAndPassword', 'mutation');
    },
    crescoAdminGetAdminList(variables?: CrescoAdminGetAdminListQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoAdminGetAdminListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoAdminGetAdminListQuery>(CrescoAdminGetAdminListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoAdminGetAdminList', 'query');
    },
    crescoAdminGetCustomerList(variables?: CrescoAdminGetCustomerListQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoAdminGetCustomerListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoAdminGetCustomerListQuery>(CrescoAdminGetCustomerListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoAdminGetCustomerList', 'query');
    },
    crescoAdminGetCustomerProfile(variables?: CrescoAdminGetCustomerProfileQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoAdminGetCustomerProfileQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoAdminGetCustomerProfileQuery>(CrescoAdminGetCustomerProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoAdminGetCustomerProfile', 'query');
    },
    crescoAdminGetLastPortfolioState(variables?: CrescoAdminGetLastPortfolioStateQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoAdminGetLastPortfolioStateQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoAdminGetLastPortfolioStateQuery>(CrescoAdminGetLastPortfolioStateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoAdminGetLastPortfolioState', 'query');
    },
    crescoAdminTransactionCheckInEth(variables?: CrescoAdminTransactionCheckInEthQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoAdminTransactionCheckInEthQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoAdminTransactionCheckInEthQuery>(CrescoAdminTransactionCheckInEthDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoAdminTransactionCheckInEth', 'query');
    },
    crescoAdminTransactionList(variables?: CrescoAdminTransactionListQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoAdminTransactionListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoAdminTransactionListQuery>(CrescoAdminTransactionListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoAdminTransactionList', 'query');
    },
    crescoCheckUserClassicByAgreementNoAndLastName(variables: CrescoCheckUserClassicByAgreementNoAndLastNameQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoCheckUserClassicByAgreementNoAndLastNameQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoCheckUserClassicByAgreementNoAndLastNameQuery>(CrescoCheckUserClassicByAgreementNoAndLastNameDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoCheckUserClassicByAgreementNoAndLastName', 'query');
    },
    crescoCustomerGetCalculatedBalance(variables?: CrescoCustomerGetCalculatedBalanceQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoCustomerGetCalculatedBalanceQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoCustomerGetCalculatedBalanceQuery>(CrescoCustomerGetCalculatedBalanceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoCustomerGetCalculatedBalance', 'query');
    },
    crescoCustomerGetMyProfile(variables?: CrescoCustomerGetMyProfileQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoCustomerGetMyProfileQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoCustomerGetMyProfileQuery>(CrescoCustomerGetMyProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoCustomerGetMyProfile', 'query');
    },
    crescoCustomerGetProfitability(variables?: CrescoCustomerGetProfitabilityQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoCustomerGetProfitabilityQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoCustomerGetProfitabilityQuery>(CrescoCustomerGetProfitabilityDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoCustomerGetProfitability', 'query');
    },
    crescoCustomerHasUnreadNotifications(variables?: CrescoCustomerHasUnreadNotificationsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoCustomerHasUnreadNotificationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoCustomerHasUnreadNotificationsQuery>(CrescoCustomerHasUnreadNotificationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoCustomerHasUnreadNotifications', 'query');
    },
    crescoCustomerListPublications(variables?: CrescoCustomerListPublicationsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoCustomerListPublicationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoCustomerListPublicationsQuery>(CrescoCustomerListPublicationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoCustomerListPublications', 'query');
    },
    crescoCustomerMyNotificationsList(variables?: CrescoCustomerMyNotificationsListQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoCustomerMyNotificationsListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoCustomerMyNotificationsListQuery>(CrescoCustomerMyNotificationsListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoCustomerMyNotificationsList', 'query');
    },
    crescoCustomerTransactionList(variables?: CrescoCustomerTransactionListQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoCustomerTransactionListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoCustomerTransactionListQuery>(CrescoCustomerTransactionListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoCustomerTransactionList', 'query');
    },
    crescoGetCrescoTokenRateHistory(variables?: CrescoGetCrescoTokenRateHistoryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoGetCrescoTokenRateHistoryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoGetCrescoTokenRateHistoryQuery>(CrescoGetCrescoTokenRateHistoryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoGetCrescoTokenRateHistory', 'query');
    },
    crescoGetCurrentCrescoTokenRate(variables?: CrescoGetCurrentCrescoTokenRateQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoGetCurrentCrescoTokenRateQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoGetCurrentCrescoTokenRateQuery>(CrescoGetCurrentCrescoTokenRateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoGetCurrentCrescoTokenRate', 'query');
    },
    crescoGetDepositInfoByAgreementNumber(variables: CrescoGetDepositInfoByAgreementNumberQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoGetDepositInfoByAgreementNumberQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoGetDepositInfoByAgreementNumberQuery>(CrescoGetDepositInfoByAgreementNumberDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoGetDepositInfoByAgreementNumber', 'query');
    },
    crescoGetExternalCoinsRates(variables?: CrescoGetExternalCoinsRatesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoGetExternalCoinsRatesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoGetExternalCoinsRatesQuery>(CrescoGetExternalCoinsRatesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoGetExternalCoinsRates', 'query');
    },
    crescoGetExternalCoinsRatesHistory(variables: CrescoGetExternalCoinsRatesHistoryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoGetExternalCoinsRatesHistoryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoGetExternalCoinsRatesHistoryQuery>(CrescoGetExternalCoinsRatesHistoryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoGetExternalCoinsRatesHistory', 'query');
    },
    crescoGetMyDepositInfo(variables?: CrescoGetMyDepositInfoQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CrescoGetMyDepositInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrescoGetMyDepositInfoQuery>(CrescoGetMyDepositInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crescoGetMyDepositInfo', 'query');
    },
    getMe(variables?: GetMeQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetMeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMeQuery>(GetMeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMe', 'query');
    },
    huobiGetData(variables?: HuobiGetDataQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<HuobiGetDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<HuobiGetDataQuery>(HuobiGetDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'huobiGetData', 'query');
    },
    userCreate(variables: UserCreateQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UserCreateQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserCreateQuery>(UserCreateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'userCreate', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
export function getSdkWithHooks(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  const sdk = getSdk(client, withWrapper);
  const genKey = <V extends Record<string, unknown> = Record<string, unknown>>(name: string, object: V = {} as V): SWRKeyInterface => [name, ...Object.keys(object).sort().map(key => object[key])];
  return {
    ...sdk,
    useCrescoAdminGetAdminList(variables?: CrescoAdminGetAdminListQueryVariables, config?: SWRConfigInterface<CrescoAdminGetAdminListQuery, ClientError>) {
      return useSWR<CrescoAdminGetAdminListQuery, ClientError>(genKey<CrescoAdminGetAdminListQueryVariables>('CrescoAdminGetAdminList', variables), () => sdk.crescoAdminGetAdminList(variables), config);
    },
    useCrescoAdminGetCustomerList(variables?: CrescoAdminGetCustomerListQueryVariables, config?: SWRConfigInterface<CrescoAdminGetCustomerListQuery, ClientError>) {
      return useSWR<CrescoAdminGetCustomerListQuery, ClientError>(genKey<CrescoAdminGetCustomerListQueryVariables>('CrescoAdminGetCustomerList', variables), () => sdk.crescoAdminGetCustomerList(variables), config);
    },
    useCrescoAdminGetCustomerProfile(variables?: CrescoAdminGetCustomerProfileQueryVariables, config?: SWRConfigInterface<CrescoAdminGetCustomerProfileQuery, ClientError>) {
      return useSWR<CrescoAdminGetCustomerProfileQuery, ClientError>(genKey<CrescoAdminGetCustomerProfileQueryVariables>('CrescoAdminGetCustomerProfile', variables), () => sdk.crescoAdminGetCustomerProfile(variables), config);
    },
    useCrescoAdminGetLastPortfolioState(variables?: CrescoAdminGetLastPortfolioStateQueryVariables, config?: SWRConfigInterface<CrescoAdminGetLastPortfolioStateQuery, ClientError>) {
      return useSWR<CrescoAdminGetLastPortfolioStateQuery, ClientError>(genKey<CrescoAdminGetLastPortfolioStateQueryVariables>('CrescoAdminGetLastPortfolioState', variables), () => sdk.crescoAdminGetLastPortfolioState(variables), config);
    },
    useCrescoAdminTransactionCheckInEth(variables?: CrescoAdminTransactionCheckInEthQueryVariables, config?: SWRConfigInterface<CrescoAdminTransactionCheckInEthQuery, ClientError>) {
      return useSWR<CrescoAdminTransactionCheckInEthQuery, ClientError>(genKey<CrescoAdminTransactionCheckInEthQueryVariables>('CrescoAdminTransactionCheckInEth', variables), () => sdk.crescoAdminTransactionCheckInEth(variables), config);
    },
    useCrescoAdminTransactionList(variables?: CrescoAdminTransactionListQueryVariables, config?: SWRConfigInterface<CrescoAdminTransactionListQuery, ClientError>) {
      return useSWR<CrescoAdminTransactionListQuery, ClientError>(genKey<CrescoAdminTransactionListQueryVariables>('CrescoAdminTransactionList', variables), () => sdk.crescoAdminTransactionList(variables), config);
    },
    useCrescoCheckUserClassicByAgreementNoAndLastName(variables: CrescoCheckUserClassicByAgreementNoAndLastNameQueryVariables, config?: SWRConfigInterface<CrescoCheckUserClassicByAgreementNoAndLastNameQuery, ClientError>) {
      return useSWR<CrescoCheckUserClassicByAgreementNoAndLastNameQuery, ClientError>(genKey<CrescoCheckUserClassicByAgreementNoAndLastNameQueryVariables>('CrescoCheckUserClassicByAgreementNoAndLastName', variables), () => sdk.crescoCheckUserClassicByAgreementNoAndLastName(variables), config);
    },
    useCrescoCustomerGetCalculatedBalance(variables?: CrescoCustomerGetCalculatedBalanceQueryVariables, config?: SWRConfigInterface<CrescoCustomerGetCalculatedBalanceQuery, ClientError>) {
      return useSWR<CrescoCustomerGetCalculatedBalanceQuery, ClientError>(genKey<CrescoCustomerGetCalculatedBalanceQueryVariables>('CrescoCustomerGetCalculatedBalance', variables), () => sdk.crescoCustomerGetCalculatedBalance(variables), config);
    },
    useCrescoCustomerGetMyProfile(variables?: CrescoCustomerGetMyProfileQueryVariables, config?: SWRConfigInterface<CrescoCustomerGetMyProfileQuery, ClientError>) {
      return useSWR<CrescoCustomerGetMyProfileQuery, ClientError>(genKey<CrescoCustomerGetMyProfileQueryVariables>('CrescoCustomerGetMyProfile', variables), () => sdk.crescoCustomerGetMyProfile(variables), config);
    },
    useCrescoCustomerGetProfitability(variables?: CrescoCustomerGetProfitabilityQueryVariables, config?: SWRConfigInterface<CrescoCustomerGetProfitabilityQuery, ClientError>) {
      return useSWR<CrescoCustomerGetProfitabilityQuery, ClientError>(genKey<CrescoCustomerGetProfitabilityQueryVariables>('CrescoCustomerGetProfitability', variables), () => sdk.crescoCustomerGetProfitability(variables), config);
    },
    useCrescoCustomerHasUnreadNotifications(variables?: CrescoCustomerHasUnreadNotificationsQueryVariables, config?: SWRConfigInterface<CrescoCustomerHasUnreadNotificationsQuery, ClientError>) {
      return useSWR<CrescoCustomerHasUnreadNotificationsQuery, ClientError>(genKey<CrescoCustomerHasUnreadNotificationsQueryVariables>('CrescoCustomerHasUnreadNotifications', variables), () => sdk.crescoCustomerHasUnreadNotifications(variables), config);
    },
    useCrescoCustomerListPublications(variables?: CrescoCustomerListPublicationsQueryVariables, config?: SWRConfigInterface<CrescoCustomerListPublicationsQuery, ClientError>) {
      return useSWR<CrescoCustomerListPublicationsQuery, ClientError>(genKey<CrescoCustomerListPublicationsQueryVariables>('CrescoCustomerListPublications', variables), () => sdk.crescoCustomerListPublications(variables), config);
    },
    useCrescoCustomerMyNotificationsList(variables?: CrescoCustomerMyNotificationsListQueryVariables, config?: SWRConfigInterface<CrescoCustomerMyNotificationsListQuery, ClientError>) {
      return useSWR<CrescoCustomerMyNotificationsListQuery, ClientError>(genKey<CrescoCustomerMyNotificationsListQueryVariables>('CrescoCustomerMyNotificationsList', variables), () => sdk.crescoCustomerMyNotificationsList(variables), config);
    },
    useCrescoCustomerTransactionList(variables?: CrescoCustomerTransactionListQueryVariables, config?: SWRConfigInterface<CrescoCustomerTransactionListQuery, ClientError>) {
      return useSWR<CrescoCustomerTransactionListQuery, ClientError>(genKey<CrescoCustomerTransactionListQueryVariables>('CrescoCustomerTransactionList', variables), () => sdk.crescoCustomerTransactionList(variables), config);
    },
    useCrescoGetCrescoTokenRateHistory(variables?: CrescoGetCrescoTokenRateHistoryQueryVariables, config?: SWRConfigInterface<CrescoGetCrescoTokenRateHistoryQuery, ClientError>) {
      return useSWR<CrescoGetCrescoTokenRateHistoryQuery, ClientError>(genKey<CrescoGetCrescoTokenRateHistoryQueryVariables>('CrescoGetCrescoTokenRateHistory', variables), () => sdk.crescoGetCrescoTokenRateHistory(variables), config);
    },
    useCrescoGetCurrentCrescoTokenRate(variables?: CrescoGetCurrentCrescoTokenRateQueryVariables, config?: SWRConfigInterface<CrescoGetCurrentCrescoTokenRateQuery, ClientError>) {
      return useSWR<CrescoGetCurrentCrescoTokenRateQuery, ClientError>(genKey<CrescoGetCurrentCrescoTokenRateQueryVariables>('CrescoGetCurrentCrescoTokenRate', variables), () => sdk.crescoGetCurrentCrescoTokenRate(variables), config);
    },
    useCrescoGetDepositInfoByAgreementNumber(variables: CrescoGetDepositInfoByAgreementNumberQueryVariables, config?: SWRConfigInterface<CrescoGetDepositInfoByAgreementNumberQuery, ClientError>) {
      return useSWR<CrescoGetDepositInfoByAgreementNumberQuery, ClientError>(genKey<CrescoGetDepositInfoByAgreementNumberQueryVariables>('CrescoGetDepositInfoByAgreementNumber', variables), () => sdk.crescoGetDepositInfoByAgreementNumber(variables), config);
    },
    useCrescoGetExternalCoinsRates(variables?: CrescoGetExternalCoinsRatesQueryVariables, config?: SWRConfigInterface<CrescoGetExternalCoinsRatesQuery, ClientError>) {
      return useSWR<CrescoGetExternalCoinsRatesQuery, ClientError>(genKey<CrescoGetExternalCoinsRatesQueryVariables>('CrescoGetExternalCoinsRates', variables), () => sdk.crescoGetExternalCoinsRates(variables), config);
    },
    useCrescoGetExternalCoinsRatesHistory(variables: CrescoGetExternalCoinsRatesHistoryQueryVariables, config?: SWRConfigInterface<CrescoGetExternalCoinsRatesHistoryQuery, ClientError>) {
      return useSWR<CrescoGetExternalCoinsRatesHistoryQuery, ClientError>(genKey<CrescoGetExternalCoinsRatesHistoryQueryVariables>('CrescoGetExternalCoinsRatesHistory', variables), () => sdk.crescoGetExternalCoinsRatesHistory(variables), config);
    },
    useCrescoGetMyDepositInfo(variables?: CrescoGetMyDepositInfoQueryVariables, config?: SWRConfigInterface<CrescoGetMyDepositInfoQuery, ClientError>) {
      return useSWR<CrescoGetMyDepositInfoQuery, ClientError>(genKey<CrescoGetMyDepositInfoQueryVariables>('CrescoGetMyDepositInfo', variables), () => sdk.crescoGetMyDepositInfo(variables), config);
    },
    useGetMe(variables?: GetMeQueryVariables, config?: SWRConfigInterface<GetMeQuery, ClientError>) {
      return useSWR<GetMeQuery, ClientError>(genKey<GetMeQueryVariables>('GetMe', variables), () => sdk.getMe(variables), config);
    },
    useHuobiGetData(variables?: HuobiGetDataQueryVariables, config?: SWRConfigInterface<HuobiGetDataQuery, ClientError>) {
      return useSWR<HuobiGetDataQuery, ClientError>(genKey<HuobiGetDataQueryVariables>('HuobiGetData', variables), () => sdk.huobiGetData(variables), config);
    },
    useUserCreate(variables: UserCreateQueryVariables, config?: SWRConfigInterface<UserCreateQuery, ClientError>) {
      return useSWR<UserCreateQuery, ClientError>(genKey<UserCreateQueryVariables>('UserCreate', variables), () => sdk.userCreate(variables), config);
    }
  };
}
export type SdkWithHooks = ReturnType<typeof getSdkWithHooks>;