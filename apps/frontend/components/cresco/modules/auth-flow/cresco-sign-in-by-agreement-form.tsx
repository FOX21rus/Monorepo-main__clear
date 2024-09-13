import { LockClosedIcon } from "@heroicons/react/solid";
import { useAuthFlow } from "../../../../modules/auth-flow/useAuthFlow";
import { useState } from "react";
import { useLocalStorage } from "../../../../utils/hooks/use-local-storage";
import { sdk } from "../../../../data/graphql/sdk";

export const CrescoSignInByAgreementForm = () => {
  const [agreementNo, setAgreementNo] = useLocalStorage("token", ""); //ToDo fix legacy name from agrrementNo
  // const [lastName, setLastName] = useLocalStorage("lastName", "");
  const lastName = "LastName";
  const [error, setError] = useState("");
  //By enrcyppting agreement no we enhanced securiy now clien passes token inetead
  const doSignIn = () => {
    sdk()
      .crescoCheckUserClassicByAgreementNoAndLastName({ agreementNo, lastName })
      .then((d) => d.crescoCheckUserClassicByAgreementNoAndLastName)
      .then((d) => {
        if (d) {
          localStorage.setItem("classicUserMode", "1");
          document.location.href = "/cresco/cabinet/deposits";
        } else {
          setError("User not found");
        }
      });
  };
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
            Авторизуйтесь
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Введите Токен доступа в поле ниже.
          </p>
          {/*{!authController.hasAccountJustBeenCreated && (*/}
          {/*  <p className="mt-2 text-center text-sm text-gray-600">*/}
          {/*    Or{" "}*/}
          {/*    <a*/}
          {/*      onClick={() =>*/}
          {/*        authController.setAuthFlowStage(*/}
          {/*          "SIGN_UP_VIA_EMAIL_AND_PASSWORD"*/}
          {/*        )*/}
          {/*      }*/}
          {/*      className="font-medium text-cresco-green hover:text-cresco-green-600 cursor-pointer"*/}
          {/*    >*/}
          {/*      sign up*/}
          {/*    </a>*/}
          {/*  </p>*/}
          {/*)}*/}
        </div>
        <form
          className="mt-8 space-y-4"
          // onSubmit={() => (document.location.href = "/cresco/cabinet/deposits")}
        >
          <input type="hidden" name="remember" defaultValue="true" />
          {/*<div className="rounded-md shadow-sm -space-y-px">*/}
          {/*  <div>*/}
          {/*    <label htmlFor="email-address" className="sr-only">*/}
          {/*      Фамилия*/}
          {/*    </label>*/}
          {/*    <input*/}
          {/*      id="email-address"*/}
          {/*      name="lastName"*/}
          {/*      type="text"*/}
          {/*      required*/}
          {/*      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-cresco-violet focus:border-ring-cresco-violet focus:z-10 sm:text-sm"*/}
          {/*      placeholder="Иванов"*/}
          {/*      value={lastName}*/}
          {/*      onChange={(e) => setLastName(e.target.value)}*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</div>*/}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Токен доступа
              </label>
              <input
                id="email-address"
                name="agreementNo"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-cresco-violet focus:border-ring-cresco-violet focus:z-10 sm:text-sm"
                placeholder="4DG6HCk4sdKDRmh35rGbBkqfddEMtX9S"
                value={agreementNo}
                onChange={(e) => setAgreementNo(e.target.value)}
              />
            </div>
          </div>

          <div>
            <a
              onClick={doSignIn}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cresco-green hover:bg-cresco-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-cresco-green-600 group-hover:text-white"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </a>
          </div>
          {error && <div className={"text-sm text-red-500"}>{error}</div>}
        </form>
      </div>
    </div>
  );
};
