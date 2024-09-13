import { LockClosedIcon } from "@heroicons/react/solid";
import { useAuthFlow } from "../../../../modules/auth-flow/useAuthFlow";

export const CrescoRecoverVerifyCode = ({
  authController,
}: {
  authController: ReturnType<typeof useAuthFlow>["authController"];
}) => {
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="/cresco/cc.png"
            alt="Cresco Capital"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-cresco-violet">
            Recover cresco account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Verification code has been sent to your email
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={true}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-cresco-violet focus:border-ring-cresco-violet focus:z-10 sm:text-sm"
                placeholder="Email address"
                {...authController.loginEmailInputProps}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Code
              </label>
              <input
                id="password"
                name="code"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-cresco-violet focus:border-ring-cresco-violet focus:z-10 sm:text-sm"
                placeholder="Verification code"
                {...authController.verificationCodeInputProps}
              />
            </div>
          </div>

          <div>
            <a
              onClick={() => authController.onRecoverViaEmailAndCode()}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cresco-green hover:bg-cresco-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-cresco-green-600 group-hover:text-white"
                  aria-hidden="true"
                />
              </span>
              Submit verification code
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
