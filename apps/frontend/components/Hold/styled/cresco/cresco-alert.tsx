/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon, ExclamationIcon } from "@heroicons/react/solid";

export const CrescoAlert = ({
  text,
  variant,
}: {
  text: any;
  variant: "BASIC" | "RED" | "GREEN";
}) => {
  if (variant === "BASIC") return <CrescoAlertBasic text={text} />;
  if (variant === "RED") return <CrescoAlertRed text={text} />;
  if (variant === "GREEN") return <CrescoAlertGreen text={text} />;
  return null;
};

export const CrescoAlertGreen = ({ text }) => {
  return (
    <div className="bg-lime-50 border-l-4 border-cresco-green-600 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckIcon
            className="h-5 w-5 text-cresco-green-600"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm text-cresco-green-600">{text}</p>
        </div>
      </div>
    </div>
  );
};

export const CrescoAlertBasic = ({ text }) => {
  return (
    <div className="bg-gray-50 border-l-4 border-cresco-violet-800 p-4">
      <div className="flex">
        <div className="flex-shrink-0"></div>
        <div className="ml-3">
          <p className="text-sm text-cresco-violet">{text}</p>
        </div>
      </div>
    </div>
  );
};

export const CrescoAlertRed = ({ text }) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-600 p-4">
      <div className="flex">
        <div className="flex-shrink-0"></div>
        <div className="ml-3">
          <p className="text-sm text-red-600">{text}</p>
        </div>
      </div>
    </div>
  );
};
