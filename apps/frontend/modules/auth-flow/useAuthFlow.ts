import { useState } from "react";
import { UserJwtPayload } from "../../data/graphql/sdk/graphql";

export type AuthFlowStage =
  | "SIGN_UP_VIA_EMAIL_AND_PASSWORD"
  | "SIGN_UP_VIA_EMAIL_PHONE_AND_PASSWORD"
  | "SIGN_IN_VIA_EMAIL_AND_PASSWORD"
  | "SIGN_IN_VIA_PHONE_REQUEST_OTP"
  | "SIGN_IN_VIA_PHONE_AND_OTP"
  | "SIGN_IN_VIA_AGREEMENT_NUMBER"
  | "RECOVER_REQUEST_CODE_VIA_EMAIL"
  | "RECOVER_SET_NEW_PASSWORD"
  | "RECOVER_VIA_EMAIL_AND_CODE";
export const useAuthFlow = (props: {
  initialStage: AuthFlowStage;
  paths: {
    signIn: string;
    signUp: string;
  };
  sdkGetMe: (token?: string) => Promise<UserJwtPayload>;
  sdkSignInViaEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<{ token: string }>;
  sdkSignInViaPhoneRequestOTP: (
      phone: string,
  ) => Promise<string>;

  sdkSignUpViaEmailAndPassword: (
    email: string,
    password: string,
    isAdmin?: boolean
  ) => Promise<string>;
  sdkSignUpViaEmailPhoneAndPassword: (
      email: string,
      phone: string,
      password: string,
      isAdmin?: boolean
  ) => Promise<string>;
  sdkSignInViaPhoneAndOTP: (
      email: string,
      password: string,
      isAdmin?: boolean
  ) => Promise<{ token: string, signature:string|null|undefined }>;
  sdkRecoverRequestVerificationCodeByEmail: (email: string) => Promise<string>;
  sdkRecoverViaEmailAndCode: (email: string, code: string) => Promise<string>;
  sdkRecoverSetPassword: (
    email: string,
    otp: string,
    newPassword: string
  ) => Promise<string>;
  redirectAfterLoginViaJwtRoles: (roles: string[]) => void;
}) => {
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const normalizePhone = (phone)=>{
    let p =  phone.replace(/\D/g,'')
    return p
  }
  const validatePhone = (phone) => {
    return normalizePhone(phone)
        .length>10
  };

  const validatePassword = (password) => password.length > 5;
  const [authFlowStage, setAuthFlowStage] = useState<AuthFlowStage>(
    props.initialStage
  );
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [otp, setOtp] = useState("");

  const [hasAccountJustBeenCreated, setHasAccountJustBeenCreated] =
    useState(false);
  const [hasPasswordJustBeenChanged, setHasPasswordJustBeenChanged] =
    useState(false);

  const onSignInViaEmailAndPasswordSubmit = () => {
    if (!validateEmail(email)) return setError("please provide correct email");
    props
      .sdkSignInViaEmailAndPassword(email, password)
      .then((d) => {
        if (!d.token) {
          setError("wrong login or password");
          return;
        }
        localStorage.setItem("token", d.token);
        props.sdkGetMe(d.token).then((d) => {
          if (!d.rolesJWT) throw "user has no roles to redirect";
          props.redirectAfterLoginViaJwtRoles(d.rolesJWT);
        });
      })
      .catch((e) => setError("wrong login or password"));
  };

  const onSignInViaPhoneRequestOtpSubmit = () => {
    if (!validatePhone(phone)) return setError("please provide correct phone");
    props
        .sdkSignInViaPhoneRequestOTP(phone)
        .then((d) => {
          setAuthFlowStage("SIGN_IN_VIA_PHONE_AND_OTP")
        })
        .catch((e) => setError("wrong login or password"));
  };

  const onSignInViaPhoneAndOtpSubmit = () => {
    if (!validatePhone(phone)) return setError("please provide correct phone");
    props
        .sdkSignInViaPhoneAndOTP(phone, otp)
        .then((d) => {
          if (!d.token) {
            setError("wrong one time password");
            return;
          }

          if (d.signature){
            localStorage.setItem("classicUserMode", "1");
            document.location.href = "/cresco/cabinet/deposits";
            localStorage.setItem("token", `"${d.signature}"`);
            return;
          }
          localStorage.setItem("token", d.token);

          props.sdkGetMe(d.token).then((d) => {
            if (!d.rolesJWT) throw "user has no roles to redirect";

            props.redirectAfterLoginViaJwtRoles(d.rolesJWT);
          });
        })
        .catch((e) => setError("wrong login or password"));
  };
  const onSignUpViaEmailAndPasswordSubmit = () => {
    if (!validateEmail(email)) return setError("please provide correct email");
    if (!validatePhone(phone)) return setError("please provide correct phone");
    if (!validatePassword(password))
      return setError("password should be 6 characters at least");
    props
      .sdkSignUpViaEmailPhoneAndPassword(email, phone, password)
      .then((d) => {
        setHasAccountJustBeenCreated(true);
        setAuthFlowStage("SIGN_IN_VIA_PHONE_AND_OTP");
        setError("");
      })
      .catch((e) => setError("Something wrong, try again"));
  };

  const onSignUpViaEmailPhoneAndPasswordSubmit = () => {
    if (!validateEmail(phone)) return setError("please provide correct phone");
    if (!validateEmail(email)) return setError("please provide correct email");
    if (!validatePassword(password))
      return setError("password should be 6 characters at least");
    props
        .sdkSignUpViaEmailPhoneAndPassword(email, phone, password)
        .then((d) => {
          setHasAccountJustBeenCreated(true);
          setAuthFlowStage("SIGN_IN_VIA_PHONE_AND_OTP");
          setError("");
        })
        .catch((e) => setError("Something wrong, try again"));
  };

  const onRecoverRequestVerificationCodeByEmail = () => {
    if (!validateEmail(email)) return setError("please provide correct email");
    props
      .sdkRecoverRequestVerificationCodeByEmail(email)
      .then((d) => {
        setAuthFlowStage("RECOVER_VIA_EMAIL_AND_CODE");
        setError("");
      })
      .catch((e) => setError("Something wrong, try again"));
  };
  const onRecoverViaEmailAndCode = () => {
    //sets new password
    if (!validateEmail(email)) return setError("please provide correct email");
    if (!(code.length > 5)) return setError("wrong code");
    props
      .sdkRecoverViaEmailAndCode(email, code)
      .then((d) => {
        setHasPasswordJustBeenChanged(true);
        setAuthFlowStage("SIGN_UP_VIA_EMAIL_PHONE_AND_PASSWORD");
        setMessage("reset password link has been sent to your e-mail");
        setError("");
      })
      .catch((e) => setError("wrong code"));
  };
  const onRecoverViaEmailAndCodeSetNewPassword = () => {
    //sets new password
    if (!validateEmail(email)) return setError("bad recovery link");
    props
      .sdkRecoverSetPassword(email, otp, password)
      .then((d) => {
        setHasPasswordJustBeenChanged(true);
        setAuthFlowStage("SIGN_UP_VIA_EMAIL_PHONE_AND_PASSWORD");
        setMessage("New password has been set!");
        setError("");
      })
      .catch((e) => setError("wrong code"));
  };

  return {
    authController: {
      loginEmailInputProps: {
        value: email,
        onChange: (e: any) => setEmail(e.target.value),
      },
      loginPhoneInputProps: {
        value: phone,
        onChange: (e: any) => setPhone(e.target.value),
      },
      verificationCodeInputProps: {
        value: code,
        onChange: (e: any) => setCode(e.target.value),
      },
      loginPasswordInputProps: {
        value: password,
        onChange: (e: any) => setPassword(e.target.value),
      },
      otpInputProps: {
        value: otp,
        onChange: (e: any) => setOtp(e.target.value),
      },

      recoverEmailInputProps: {
        otp,
        email,
        setOtp,
        setEmail,
      },
      authFlowStage,
      setAuthFlowStage,
      onSignUpViaEmailAndPasswordSubmit,
      onSignUpViaEmailPhoneAndPasswordSubmit,
      onRecoverRequestVerificationCodeByEmail,
      onRecoverViaEmailAndCode,
      onRecoverViaEmailAndCodeSetNewPassword,
      onSignInViaEmailAndPasswordSubmit,
      onSignInViaPhoneAndOtpSubmit,
      onSignInViaPhoneRequestOtpSubmit,
      hasAccountJustBeenCreated,
      hasPasswordJustBeenChanged,
      error,
      message,
      normalizePhone
    },
  };
};
