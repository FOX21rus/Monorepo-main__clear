import { LockClosedIcon } from "@heroicons/react/solid";
import { CrescoLayout } from "../../../Hold/styled/cresco/cresco-layout";
import {
  AuthFlowStage,
  useAuthFlow,
} from "../../../../modules/auth-flow/useAuthFlow";
import { sdk } from "../../../../data/graphql/sdk";
import { CrescoSignInViaEmailAndPasswordForm } from "./cresco-sign-in-via-email-and-password-form";
import { CrescoSignUpForm } from "./cresco-sign-up-form";
import { useRouter } from "next/router";
import { CrescoRecoverRequestCode } from "./cresco-recover-request-code";
import { CrescoRecoverVerifyCode } from "./cresco-recover-verify-code";
import { useEffect, useState } from "react";
import axios from "axios";
import { CrescoNewPasswordForm } from "./cresco-new-password-form";
import { BACKEND_URL } from "../../../../data/graphql/config";
import {CrescoSignInViaPhoneAndOtp} from "./cresco-sign-in-via-phone-and-otp";

export const CrescoAuthFlow = ({ isAdmin }: { isAdmin?: boolean }) => {
  const { authController } = useAuthFlow({
    paths: {
      signIn: "/cresco/sign-in",
      signUp: "/cresco/sign-up",
    },
    initialStage: "SIGN_IN_VIA_EMAIL_AND_PASSWORD",
    sdkGetMe: (token?: string) =>
      sdk()
        .getMe({ token })
        .then((d) => d.getMe),
    sdkSignInViaEmailAndPassword: (email, password) =>
      sdk()
        .signInViaEmailAndPassword({ email, password })
        .then((d) => ({ token: d.signInViaEmailAndPassword.token })),

    sdkSignInViaPhoneAndOTP: (phone, otp) =>
        sdk()
            .signInViaPhoneAndOTP({ phone: authController.normalizePhone(phone), otp })
            .then((d) => ({ token: d.signInViaPhoneAndOTP.token, signature:d.signInViaPhoneAndOTP.signature })),

    sdkSignInViaPhoneRequestOTP: (phone) =>
        sdk()
            .signInViaPhoneRequestOTP({ phone })
            .then((d) => d.signInViaPhoneRequestOTP),


    sdkSignUpViaEmailAndPassword: (email, password) =>
      sdk()
        .signUpViaEmailAndPassword({ email, password, isAdmin })
        .then((d) => d.signUpViaEmailAndPassword),

    sdkSignUpViaEmailPhoneAndPassword: (email, phone, password) =>
        sdk()
            .signUpViaEmailPhoneAndPassword({ phone, email, password })
            .then((d) => d.signUpViaEmailPhoneAndPassword),

    sdkRecoverViaEmailAndCode: (email, code) =>
      sdk()
        .recoverViaEmailAndCode({ email, code })
        .then((d) => d.recoverViaEmailAndCode),
    sdkRecoverRequestVerificationCodeByEmail: (email) =>
      sdk()
        .recoverRequestVerificationCodeByEmail({ email })
        .then((d) => d.recoverRequestVerificationCodeByEmail),
    sdkRecoverSetPassword: (email, otp, newPassword) =>
      axios
        .post(`${BACKEND_URL}/api/user/reset_pass`, { email, otp, newPassword })
        .then((d) => d.data),

    redirectAfterLoginViaJwtRoles: (roles: string[]) => {
      if (roles.find((role) => role === "admin"))
        document.location.href = "/cresco/admin/customers";
      if (roles.find((role) => role === "dismissed"))
        document.location.href = "/cresco/admin/customers";
      if (roles.find((role) => role === "customer_classic"))
        document.location.href = "/cresco/cabinet/deposits";
      if (roles.find((role) => role === "customer"))
        document.location.href = "/cresco/cabinet/profile";
    },
  });

  useEffect(() => {
    console.log(234);
    if (document.location.search.includes("?otp=")) {
      console.log(2345);
      const [otp, email] = document.location.search
        .replace("?otp=", "")
        .replace("email=", "")
        .split("&");

      authController.setAuthFlowStage("RECOVER_SET_NEW_PASSWORD");
      authController.recoverEmailInputProps.setEmail(email);
      authController.recoverEmailInputProps.setOtp(otp);
      // setInitialStage("RECOVER_SET_NEW_PASSWORD");
      // setOtp(otp);
      // setEmail(email);
    }
  }, []);

  return (
    <CrescoLayout>
      {authController.authFlowStage === "SIGN_IN_VIA_EMAIL_AND_PASSWORD" && (
        <CrescoSignInViaEmailAndPasswordForm
          authController={authController}
          isCustomerCrypto={true}
        />
      )}
      {(authController.authFlowStage === "SIGN_IN_VIA_PHONE_AND_OTP" || authController.authFlowStage === "SIGN_IN_VIA_PHONE_REQUEST_OTP") && (
          <CrescoSignInViaPhoneAndOtp
              authController={authController}
              isCustomerCrypto={true}
          />
      )}
      {authController.authFlowStage === "SIGN_UP_VIA_EMAIL_AND_PASSWORD" && (
        <CrescoSignUpForm
          authController={authController}
          isCustomerCrypto={true}
        />
      )}
      {authController.authFlowStage === "RECOVER_REQUEST_CODE_VIA_EMAIL" && (
        <CrescoRecoverRequestCode authController={authController} />
      )}
      {authController.authFlowStage === "RECOVER_VIA_EMAIL_AND_CODE" && (
        <CrescoRecoverVerifyCode authController={authController} />
      )}
      {authController.authFlowStage === "RECOVER_SET_NEW_PASSWORD" && (
        <CrescoNewPasswordForm authController={authController} />
      )}

      {!!authController.error && (
        <p className={"text-center text-xs text-red-500 -mt-10"}>
          {authController.error}
        </p>
      )}
      {!!authController.message && (
        <p className={"text-center text-sm font-bold text-cresco-green-600 "}>
          {authController.message}
        </p>
      )}
    </CrescoLayout>
  );
};

/*
  This example requires Tailwind CSS v2.0+

  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
