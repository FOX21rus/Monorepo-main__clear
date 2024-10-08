/* This example requires Tailwind CSS v2.0+ */
import { Fragment, ReactNode, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { classList } from "common/classList";

interface PropsSideOver {
  open;
  setOpen;
  title: string;
  children: ReactNode;
  variant?: "tight";
}
export const useSideOver = ({ title }) => {
  const [open, setOpen] = useState(false);
  return {
    setOpen,
    propsSideOver: {
      open,
      setOpen,
      title,
    },
  };
};
export const SideOver = (props: PropsSideOver) => {
  const { open, setOpen } = props;

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={setOpen}
      >
        <div
          className={classList(
            "absolute inset-0 overflow-hidden transition-all duration-1000",
            open ? "backdrop-blur" : "backdrop-blur-none"
          )}
        >
          <Dialog.Overlay className="absolute inset-0" />

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div
                className={`w-screen ${
                  props.variant !== "tight" ? "max-w-5xl" : "max-w-2xl"
                }`}
              >
                <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                  <div className="px-4 py-3 -mt-6 sm:px-6  bg-cresco-violet-800">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-bold text-white">
                        {props.title}
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    {props.children}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
