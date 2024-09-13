import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { classNames } from "../../../../utils/classList";
import { PropsButton } from "../../../../modules/basic-components/blocks/buttons/types/props-button";

export const CrescoButton = (
  props: PropsButton & { variant: "BASIC" | "LINK" }
) => {
  if (props.variant === "BASIC")
    return (
      <button
        type="button"
        {...props}
        className={classNames(
          "inline-flex items-center px-3 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cresco-green-400 hover:bg-cresco-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cresco-green",
          props.className
        )}
      >
        {props.children}
      </button>
    );

  if (props.variant === "LINK")
    return (
      <button
        type="button"
        {...props}
        className={classNames(
          "inline-flex items-center  py-1 mr-3 border border-transparent text-base underline underline-offset-2 rounded-md focus:outline-none ",
          props.className
        )}
      >
        {props.children}
      </button>
    );

  return null;
};
