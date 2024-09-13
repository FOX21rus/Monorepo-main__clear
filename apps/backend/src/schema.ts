
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum FieldTypeEnum {
    MARKDOWN_LINE = "MARKDOWN_LINE",
    MARKDOWN = "MARKDOWN",
    DICTIONARY = "DICTIONARY",
    FILE_URL = "FILE_URL",
    FILE_URLS = "FILE_URLS",
    EXTERNAL_OBJECT = "EXTERNAL_OBJECT",
    CrescoManagerSelector = "CrescoManagerSelector",
    MANAGER_SELECTOR = "MANAGER_SELECTOR"
}

export enum MutationStatus {
    OK = "OK",
    ERROR = "ERROR"
}

export enum RandomizerEnum {
    USER_ID = "USER_ID"
}

export enum CrescoUserRoles {
    super_admin = "super_admin",
    dismissed = "dismissed",
    admin_customers = "admin_customers",
    admin = "admin",
    customer = "customer",
    service_token = "service_token",
    all = "all"
}

export enum CrescoTokenRatesPeriod {
    INSTANT = "INSTANT",
    DAY = "DAY",
    WEEK = "WEEK",
    MONTH = "MONTH",
    MONTH3 = "MONTH3",
    YEAR = "YEAR",
    ALL = "ALL"
}

export enum CrescoTransactionTypeEnum {
    CLIENT_BUY_TOKENS = "CLIENT_BUY_TOKENS",
    CLIENT_SELL_TOKENS = "CLIENT_SELL_TOKENS"
}

export enum CrescoTransactionStatus {
    PENDING = "PENDING",
    ROBOT_APPROVED = "ROBOT_APPROVED",
    APPROVED = "APPROVED",
    FAILED = "FAILED",
    PRE_APPROVED = "PRE_APPROVED"
}

export class FileUrlInput {
    url: string;
    name: string;
}

export class CrescoCustomerCustomerInput {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    middleName?: Nullable<string>;
    walletAddress?: Nullable<string>;
    passportScanFiles?: Nullable<FileUrlInput[]>;
    signedAgreementUrl?: Nullable<FileUrlInput[]>;
    phone?: Nullable<string>;
}

export class CrescoCustomerAdminInput {
    userUri?: Nullable<string>;
    isPassportVerified?: Nullable<boolean>;
    crescoTokenBalance?: Nullable<number>;
    managerFullName?: Nullable<string>;
    overallUSDTInvestments?: Nullable<number>;
    agreementNo?: Nullable<string>;
    agreementUrl?: Nullable<FileUrlInput[]>;
}

export class CrescoDepositInput {
    startDate: string;
    finishDate: string;
    percentRate: number;
    depositNo: string;
}

export class CrescoTransactionInput {
    transactionType?: Nullable<CrescoTransactionTypeEnum>;
    userUri?: Nullable<string>;
    amountUSDT: number;
}

export class CrescoPublicationInput {
    id?: Nullable<string>;
    title: string;
    text: string;
    imageUrl?: Nullable<FileUrlInput[]>;
}

export class CrescoNotificationInput {
    userUri: string;
    title?: Nullable<string>;
    text: string;
    cta?: Nullable<string>;
    ctaUrl?: Nullable<string>;
    emotion?: Nullable<number>;
}

export abstract class IQuery {
    abstract getMe(token?: Nullable<string>): UserJWTPayload | Promise<UserJWTPayload>;

    abstract huobiGetData(): Nullable<string> | Promise<Nullable<string>>;

    abstract userCreate(email: string, password: string): Nullable<string> | Promise<Nullable<string>>;

    abstract crescoCustomerGetMyProfile(): CrescoCustomer | Promise<CrescoCustomer>;

    abstract crescoCustomerGetCalculatedBalance(): number | Promise<number>;

    abstract crescoCustomerGetProfitability(): number | Promise<number>;

    abstract crescoCustomerTransactionList(): CrescoTransaction[] | Promise<CrescoTransaction[]>;

    abstract crescoCustomerMyNotificationsList(): CrescoNotification[] | Promise<CrescoNotification[]>;

    abstract crescoCustomerHasUnreadNotifications(): boolean | Promise<boolean>;

    abstract crescoGetExternalCoinsRates(): CrescoExternalCoinRate[] | Promise<CrescoExternalCoinRate[]>;

    abstract crescoGetExternalCoinsRatesHistory(limit: number): CrescoExternalCoinRateHistory[] | Promise<CrescoExternalCoinRateHistory[]>;

    abstract crescoCheckUserClassicByAgreementNoAndLastName(agreementNo: string, lastName: string): boolean | Promise<boolean>;

    abstract crescoGetCurrentCrescoTokenRate(): CrescoTokenRate | Promise<CrescoTokenRate>;

    abstract crescoGetCrescoTokenRateHistory(forPeriod?: Nullable<CrescoTokenRatesPeriod>): CrescoTokenRate[] | Promise<CrescoTokenRate[]>;

    abstract crescoCustomerListPublications(): CrescoPublication[] | Promise<CrescoPublication[]>;

    abstract crescoAdminGetCustomerList(userUri?: Nullable<string>): CrescoCustomer[] | Promise<CrescoCustomer[]>;

    abstract crescoAdminGetCustomerProfile(userUri?: Nullable<string>): CrescoCustomer | Promise<CrescoCustomer>;

    abstract crescoAdminGetAdminList(): User[] | Promise<User[]>;

    abstract crescoAdminGetLastPortfolioState(): CrescoPortfolioState | Promise<CrescoPortfolioState>;

    abstract crescoAdminTransactionList(status?: Nullable<CrescoTransactionStatus>): CrescoTransaction[] | Promise<CrescoTransaction[]>;

    abstract crescoAdminTransactionCheckInEth(transactionId?: Nullable<string>): Nullable<string> | Promise<Nullable<string>>;

    abstract crescoGetDepositInfoByAgreementNumber(agreementNo: string): Nullable<JSON> | Promise<Nullable<JSON>>;

    abstract crescoGetMyDepositInfo(): Nullable<JSON> | Promise<Nullable<JSON>>;
}

export abstract class IMutation {
    abstract signUpViaEmailAndPassword(email: string, password: string, isAdmin?: Nullable<boolean>): string | Promise<string>;

    abstract signInViaEmailAndPassword(email: string, password: string): AuthResultDto | Promise<AuthResultDto>;

    abstract signUpViaEmailPhoneAndPassword(email: string, phone: string, password: string, isAdmin?: Nullable<boolean>): string | Promise<string>;

    abstract signInViaPhoneAndOTP(phone: string, otp: string): AuthResultDto | Promise<AuthResultDto>;

    abstract signInViaPhoneRequestOTP(phone: string): string | Promise<string>;

    abstract recoverRequestVerificationCodeByEmail(email: string): string | Promise<string>;

    abstract recoverViaEmailAndCode(email: string, code: string): string | Promise<string>;

    abstract createOrFindUserViaTelegramInitData(telegramInitData: string): string | Promise<string>;

    abstract crescoCustomerUpsertMyProfile(input?: Nullable<CrescoCustomerCustomerInput>): string | Promise<string>;

    abstract crescoAdminUpsertCustomerProfile(input?: Nullable<CrescoCustomerAdminInput>): string | Promise<string>;

    abstract crescoAdminUpsertPublication(input?: Nullable<CrescoPublicationInput>): string | Promise<string>;

    abstract crescoAdminCreateNewPortfolioState(coinBalances: JSON, crescoTokensOverallAmount: number): string | Promise<string>;

    abstract crescoAdminSetAdminRoles(userUri: string, roles: string[]): string | Promise<string>;

    abstract crescoAdminSendNotification(input?: Nullable<CrescoNotificationInput>, isBroadcast?: Nullable<boolean>): string | Promise<string>;

    abstract crescoCustomerTransactionCreate(transactionType: CrescoTransactionTypeEnum, amountCrescoTokens: number, customerWallet: string): Nullable<string> | Promise<Nullable<string>>;

    abstract crescoAdminTransactionSetStatus(transactionId?: Nullable<string>, status?: Nullable<CrescoTransactionStatus>): Nullable<string> | Promise<Nullable<string>>;

    abstract crescoTestInitData(): Nullable<string> | Promise<Nullable<string>>;

    abstract crescoCustomerClassicRequestUSDTDeposit(agreementNo: string, walletAddress: string, amount: number): string | Promise<string>;

    abstract crescoCustomerClassicRequestFullReport(agreementNo: string): string | Promise<string>;

    abstract crescoCustomerClassicRequestWithdrawal(agreementNo: string): string | Promise<string>;
}

export class AuthResultDto {
    token: string;
    classicUserMode?: Nullable<boolean>;
    signature?: Nullable<string>;
}

export class TelegramMessage {
    _id?: Nullable<string>;
    rawData?: Nullable<JSON>;
    telegramBotName?: Nullable<string>;
    telegramChatId?: Nullable<number>;
}

export class User {
    phone?: Nullable<string>;
    phones?: Nullable<string[]>;
    email?: Nullable<string>;
    emails?: Nullable<string[]>;
    agreementName?: Nullable<string>;
    agreementNames?: Nullable<string[]>;
    signature?: Nullable<string>;
    telegramId?: Nullable<string>;
    telegramIds?: Nullable<string>;
    rolesJwt?: Nullable<string[]>;
    roles?: Nullable<string[]>;
    displayName?: Nullable<string>;
    scope?: Nullable<string>;
    passwordHash?: Nullable<string>;
    otp?: Nullable<string>;
    otpExpiresAt?: Nullable<Date>;
}

export class UserJWTPayload {
    userUri: string;
    displayName?: Nullable<string>;
    rolesJWT?: Nullable<string[]>;
    email?: Nullable<string>;
}

export class ServiceFunctions {
    crescoUpdateCustomerBalance?: Nullable<string>;
    crescoUpdateRates?: Nullable<string>;
    crescoRobotCheckEthScanTransaction?: Nullable<string>;
}

export class CrescoTokenRate {
    ts: Date;
    rateUSDT: number;
    crescoTokensAmount: number;
}

export class FileUrl {
    url: string;
    name: string;
}

export class CrescoDeposits {
    name?: Nullable<string>;
    payload?: Nullable<JSON>;
}

export class CrescoCustomer {
    userUri?: Nullable<string>;
    isPassportVerified?: Nullable<boolean>;
    firstName?: Nullable<string>;
    middleName?: Nullable<string>;
    lastName?: Nullable<string>;
    phone?: Nullable<string>;
    managerFullName?: Nullable<string>;
    walletAddress?: Nullable<string>;
    crescoTokenBalance?: Nullable<number>;
    overallUSDTInvestments?: Nullable<number>;
    passportScanFiles?: Nullable<FileUrl[]>;
    agreementUrl?: Nullable<FileUrl[]>;
    agreementNo?: Nullable<string>;
    signedAgreementUrl?: Nullable<FileUrl[]>;
    isPrepared?: Nullable<boolean>;
}

export class CrescoDeposit {
    startDate?: Nullable<Date>;
    finishDate?: Nullable<Date>;
    percentRate?: Nullable<number>;
    depositNo?: Nullable<string>;
}

export class CrescoPortfolioState {
    _id?: Nullable<string>;
    createdAt?: Nullable<Date>;
    currenciesAmountsHashmap?: Nullable<JSON>;
    crescoTokensOverallAmount?: Nullable<number>;
    createdByUserUri?: Nullable<string>;
}

export class CrescoExternalCoinRate {
    name?: Nullable<string>;
    displayName?: Nullable<string>;
    rate?: Nullable<number>;
}

export class CrescoExternalCoinRateHistory {
    name?: Nullable<string>;
    displayName?: Nullable<string>;
    rate?: Nullable<number>;
    createdAt?: Nullable<Date>;
}

export class CrescoTransaction {
    _id?: Nullable<string>;
    transactionType?: Nullable<CrescoTransactionTypeEnum>;
    userUri?: Nullable<string>;
    amountUSDT: number;
    amountCrescoTokens: number;
    status?: Nullable<CrescoTransactionStatus>;
    fromWallet: string;
    toWallet: string;
    createdAt: Date;
}

export class CrescoNotification {
    userUri: string;
    title?: Nullable<string>;
    text: string;
    cta?: Nullable<string>;
    ctaUrl?: Nullable<string>;
    emotion?: Nullable<number>;
    createdAt?: Nullable<Date>;
    isRead?: Nullable<boolean>;
}

export class CrescoPublication {
    id: string;
    title: string;
    text: string;
    imageUrl?: Nullable<FileUrl[]>;
    createdAt?: Nullable<Date>;
}

export class CrescoReportFile {
    fileUrl?: Nullable<string>;
}

export type JSON = any;
type Nullable<T> = T | null;
