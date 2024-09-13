/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useLocalStorage } from "../../../../utils/hooks/use-local-storage";
import Script from "next/script";
import { sdk } from "../../../../data/graphql/sdk";
import { useNavGuard } from "../../../../data/helpers/use-nav-guard";
import { CrescoUnverifiedNotice } from "../../../cresco/modules/cresco-unverified-notice/cresco-unverified-notice";
// import Script from "next/script";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const CrescoLayoutCabinet = ({ children, title, isAdmin }) => {
  const Router = useRouter();
  const pathname = Router.pathname;
  const roles = useNavGuard();
  const isSuperAdmin = roles.includes("super_admin");
  const isDismissed = roles.includes("dismissed");
  const { data } = sdk().useCrescoCustomerHasUnreadNotifications();

  const { data: profileData } = sdk().useCrescoCustomerGetMyProfile();
  const isVerified =
    profileData?.crescoCustomerGetMyProfile?.isPassportVerified;

  const hasNewNotifications =
    data?.crescoCustomerHasUnreadNotifications ?? false;

  const [classicUserMode, setClassicUSerMode] = useLocalStorage(
    "classicUserMode",
    "0"
  );

  const userNavigation = [
    !classicUserMode &&
      !isAdmin &&
      !isDismissed && {
        name: "Your Profile",
        href: "/cresco/cabinet/profile",
      },
    // classicUserMode && {
    //   name: "Ваш Профиль",
    //   href: "/cresco/cabinet/profile-classic",
    // },
    {
      name: "Выйти",
      href: classicUserMode ? "/cresco/login" : "/cresco/login",
    },
  ].filter(Boolean) as any;

  const navigation = isDismissed
    ? []
    : isAdmin
    ? [
        isSuperAdmin && {
          name: "Admins",
          href: "/cresco/admin/admins",
          // current: false,
        },
        {
          name: "Customers",
          href: "/cresco/admin/customers",
          // , current: false
        },
        {
          name: "Transactions",
          href: "/cresco/admin/transactions",
          // current: false,
        },
        {
          name: "Admin Portfolio",
          href: "/cresco/admin/portfolio",
          // current: false,
        },

        {
          name: "Deposits",
          href: "/cresco/admin/deposits",
          // , current: true
        },
        {
          name: "Analytics",
          href: "/cresco/admin/analytics",
          // current: false,
        },
        // !classicUserMode && {
        //   name: "Tokens (test only)",
        //   href: "/cresco/cabinet/tokens",
        //   // , current: true
        // },
        // classicUserMode && {
        //   name: "Deposits (test only)",
        //   href: "/cresco/cabinet/deposits",
        //   // , current: false
        // },
      ].filter(Boolean)
    : [
        !classicUserMode &&
          isVerified && {
            name: "Portfolio",
            href: "/cresco/cabinet/tokens",
            // , current: true
          },
        classicUserMode && {
          name: "Портфель",
          href: "/cresco/cabinet/deposits",
          // , current: false
        },
        !classicUserMode &&
          isVerified && {
            name: "Analytics",
            href: "/cresco/cabinet/analytics",
            // current: false,
          },
        !classicUserMode && {
          name: "Contact manager",
          href: "/cresco/cabinet/contacts",
          // , current: false
        },
        classicUserMode && {
          name: "Контакты",
          href: "/cresco/cabinet/contacts-ru",
          // , current: false
        },
        // {
        //   name: "Home",
        //   href: "https://cresco.capital",
        //   // , current: false
        // }
        // {
        //   name: "Admin (test only)",
        //   href: "/cresco/admin/customers",
        //   // , current: false
        // },
      ].filter(Boolean);
  // .map((n) => ({ ...n, current: Router.pathname.match(n.href) }));
  const showNotifications = !classicUserMode && !isAdmin && !isDismissed;
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
        <script async src="https://telegram-feedback.com/chat.js?wid=3805f59e-beef-4c8c-94bc-73338543a784"></script>
      */}
      {/*<Script src="https://app.telegram-feedback.com/chat.js?wid=3805f59e-beef-4c8c-94bc-73338543a784"></Script>*/}
      <div className="min-h-full">
        {/*<Script src="https://app.telegram-feedback.com/chat.js?wid=3805f59e-beef-4c8c-94bc-73338543a784"></Script>*/}
        <Disclosure
          as="nav"
          className="bg-white border-b border-gray-200"
          key={Math.random()}
        >
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center">
                      <img
                        className="block lg:hidden h-16 w-auto"
                        src={
                          !!classicUserMode
                            ? "/cresco/cc.png"
                            : "/cresco/cc2.png"
                        }
                        alt="Workflow"
                      />
                      <img
                        className="hidden lg:block h-16 w-auto"
                        src={
                          !!classicUserMode
                            ? "/cresco/cc.png"
                            : "/cresco/cc2.png"
                        }
                        alt="Workflow"
                      />
                    </div>
                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      {navigation.map((item, i) => (
                        <a
                          key={item.href + i}
                          href={item.href + ""}
                          className={classNames(
                            pathname === item.href
                              ? "border-cresco-green-400 text-gray-900"
                              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                            "inline-flex items-center px-1 pt-1 border-b-4 text-sm font-medium"
                          )}
                          aria-current={"page"}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    {showNotifications && (
                      <button
                        type="button"
                        className="relative bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cresco-green"
                        onClick={() =>
                          Router.push("/cresco/cabinet/notifications")
                        }
                      >
                        <span className="sr-only">View notifications</span>
                        {hasNewNotifications && (
                          <div
                            className={
                              "absolute ml-4 w-2 h-2 -mt-1 rounded-full bg-red-500"
                            }
                          ></div>
                        )}
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    )}

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cresco-green-600">
                          <span className="sr-only">Open user menu</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-cresco-green-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                  <div className="-mr-2 flex items-center sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="pt-2 pb-3 space-y-1">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.href}
                      as="a"
                      href={item.href}
                      className={classNames(
                        pathname === item.href
                          ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                          : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800",
                        "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                      )}
                      aria-current={"page"}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-200">
                  {showNotifications && (
                    <div className="flex items-center px-4">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={user.imageUrl}
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-gray-800">
                          {user.name}
                        </div>
                        <div className="text-sm font-medium text-gray-500">
                          {user.email}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="relative ml-auto bg-white flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() =>
                          Router.push("/cresco/cabinet/notifications")
                        }
                      >
                        <span className="sr-only">View notifications</span>
                        {hasNewNotifications && (
                          <div
                            className={
                              "absolute ml-4 w-2 h-2 -mt-1 rounded-full bg-red-500"
                            }
                          ></div>
                        )}
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                  <div className="mt-3 space-y-1">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <div className="py-10">
          <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {!isAdmin && <CrescoUnverifiedNotice />}
              <h1 className="text-3xl font-bold leading-tight text-cresco-violet">
                {title}
              </h1>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-5 px-3">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
