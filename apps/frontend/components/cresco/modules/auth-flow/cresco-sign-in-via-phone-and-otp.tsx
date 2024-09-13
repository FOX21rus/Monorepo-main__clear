import { LockClosedIcon } from "@heroicons/react/solid";
import { useAuthFlow } from "../../../../modules/auth-flow/useAuthFlow";

export const CrescoSignInViaPhoneAndOtp = ({
  authController,
    isCustomerCrypto
}: {
  authController: ReturnType<typeof useAuthFlow>["authController"];
  isCustomerCrypto?:boolean
}) => {
  const codeRequested = authController.authFlowStage==="SIGN_IN_VIA_PHONE_AND_OTP"
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src={isCustomerCrypto?"/cresco/cc2.png":"/cresco/cc.png"}
            alt="Cresco Capital"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-cresco-violet">
            Sign in to your account via Phone
          </h2>
          {!authController.hasAccountJustBeenCreated && (
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <a
                onClick={() =>
                  authController.setAuthFlowStage(
                    "SIGN_UP_VIA_EMAIL_AND_PASSWORD"
                  )
                }
                className="font-medium text-cresco-green hover:text-cresco-green-600 cursor-pointer"
              >
                sign up
              </a>
            </p>
          )}
          {authController.hasAccountJustBeenCreated && (
            <p className="mt-2 text-center text-sm text-gray-600">
              Your account has just been created
            </p>
          )}
          {authController.hasPasswordJustBeenChanged && (
              <p className="mt-2 text-center text-sm text-gray-600">
                Your account has just been created
              </p>
          )}
        </div>
        <form
          className="mt-8 space-y-6"
          // onSubmit={() => (document.location.href = "/cresco/cabinet/deposits")}
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Phone number
              </label>
              <input
                id="email-address"
                name="phone"
                type="text"
                autoComplete="phone"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 ${codeRequested?"rounded-t-md":"rounded-t-md rounded-b-md"} focus:outline-none focus:ring-cresco-violet focus:border-ring-cresco-violet focus:z-10 sm:text-sm`}
                placeholder="Phone number"
                {...authController.loginPhoneInputProps}
              />
            </div>
            {codeRequested&&<div>
              <label htmlFor="otp" className="sr-only">
                Code from sms
              </label>
              <input
                  id="otp"
                  name="otp"
                  type="text"
                  autoComplete="one-time-code"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-cresco-violet focus:border-ring-cresco-violet focus:z-10 sm:text-sm"
                  placeholder="Code from sms"
                  {...authController.otpInputProps}
              />
            </div>}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-cresco-green focus:ring-cresco-green border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            {/*<div className="text-sm">*/}
            {/*  <a*/}
            {/*    onClick={() =>*/}
            {/*      authController.setAuthFlowStage(*/}
            {/*        "RECOVER_REQUEST_CODE_VIA_EMAIL"*/}
            {/*      )*/}
            {/*    }*/}
            {/*    className="font-medium text-cresco-green-600 hover:text-cresco-green-400 cursor-pointer"*/}
            {/*  >*/}
            {/*    Forgot your password?*/}
            {/*  </a>*/}
            {/*</div>*/}
          </div>

          {!codeRequested&&<div>
            <a
                onClick={() => authController.onSignInViaPhoneRequestOtpSubmit()}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cresco-green hover:bg-cresco-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                    className="h-5 w-5 text-cresco-green-600 group-hover:text-white"
                    aria-hidden="true"
                />
              </span>
              Request One Time Password
            </a>
          </div>}

          {codeRequested&&<div>
            <a
                onClick={() => authController.onSignInViaPhoneAndOtpSubmit()}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cresco-green hover:bg-cresco-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                    className="h-5 w-5 text-cresco-green-600 group-hover:text-white"
                    aria-hidden="true"
                />
              </span>
              Sign in
            </a>
          </div>}


        </form>
      </div>
    </div>
  );
};
