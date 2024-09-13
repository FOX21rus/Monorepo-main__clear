import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactChildren,
  ReactNode,
} from "react";
import { InputText } from "../../../../../modules/basic-components/elements/inputs/variants/input-text";
import { InputProps } from "../../../../../modules/basic-components/elements/inputs/types/input.props";
import { InputCheckbox } from "../../../../../modules/basic-components/elements/inputs/variants/input-checkbox";
import { InputRadioGroup } from "../../../../../modules/basic-components/elements/inputs/variants/input-radio-group";
import { InputFile } from "../../../../../modules/basic-components/elements/inputs/variants/input-file";
import { InputNumberRub } from "../../../../../modules/basic-components/elements/inputs/variants/input-number-rub";
import { InputFloat } from "../../../../../modules/basic-components/elements/inputs/variants/input-float";
import { classList } from "../../../../../utils/classList";
import { InputDate } from "../../../../../modules/basic-components/elements/inputs/variants/input-date";
import { InputNumber } from "../../../../../modules/basic-components/elements/inputs/variants/input-number";
import {InputPhone} from "../../../../../modules/basic-components/elements/inputs/variants/input-phone";

type CrescoInputTypes =
  | "String"
  | "Float"
  | "Date"
  | "FileUrl"
  | "Boolean"
  | "FILE_URLS"
  | "FILE_URL"
    | "Phone"
  | "Int";
export interface InputAnnotation {
  title: string;
  description?: string;
}
interface propsCrescoInput {
  type: CrescoInputTypes;
  annotation: InputAnnotation;
  childrenFieldset?: boolean;
  allowNegative?:boolean
}
export const CrescoAnnotatedInput = (props: propsCrescoInput & InputProps) => {
  let input: ReactNode = null;

  if (props.type === "String")
    input = (
      <InputText
        {...props}
        className={
          "shadow-sm focus:ring-cresco-violet focus:border-ring-cresco-violet block w-full sm:text-sm border-gray-300 rounded-md"
        }
      />
    );

  if (props.type === "Date")
    input = (
      <InputDate
        {...props}
        className={
          "shadow-sm focus:ring-cresco-violet focus:border-ring-cresco-violet block w-full sm:text-sm border-gray-300 rounded-md"
        }
      />
    );

  if (props.type === "Float")
    input = (
      <InputFloat
        {...props}
        className={
          "shadow-sm focus:ring-cresco-violet focus:border-ring-cresco-violet block w-full sm:text-sm border-gray-300 rounded-md"
        }
      />
    );

  if (props.type === "Int")
    input = (
      <InputNumber
        {...props}
        className={
          "shadow-sm focus:ring-cresco-violet focus:border-ring-cresco-violet block w-full sm:text-sm border-gray-300 rounded-md"
        }
      />
    );

    if (props.type === "Phone")
        input = (
            <InputPhone
                {...props}
                className={
                    "shadow-sm focus:ring-cresco-violet focus:border-ring-cresco-violet block w-full sm:text-sm border-gray-300 rounded-md"
                }
            />
        );

  if (props.type === "Boolean")
    input = (
      <InputRadioGroup
        {...props}
        className={"text-cresco-violet"}
        options={[
          { text: "yes", value: true },
          { text: "no", value: false },
        ]}
      />
    );
  if (props.type === "FILE_URLS")
    input = <InputFile {...props} className={""} single={false} />;

  if (props.type === "FILE_URL")
    input = <InputFile {...props} className={""} single={true} />;

  if (!input) input = <p>{props.type}</p>;

  return (
    <CrescoInputAnnotationWrapper
      annotation={props.annotation}
      childrenFieldset={props.childrenFieldset}
    >
      {input}
    </CrescoInputAnnotationWrapper>
  );

  return <div>{props.type}</div>;
};

export const CrescoInputAnnotationWrapper = ({
  annotation,
  children,
  childrenFieldset,
}: {
  annotation: InputAnnotation;
  children: ReactNode;
  childrenFieldset?: boolean;
}) => {
  return (
    <div className={"max-w-lg"}>
      <label
        htmlFor="email"
        className={classList(
          "block font-medium text-gray-700",
          childrenFieldset ? "text-base" : "text-sm "
        )}
      >
        {annotation.title}
      </label>
      <div className="mt-1">{children}</div>
      {annotation.description && (
        <p className="mt-2 text-sm text-gray-500" id="email-description">
          {annotation.description}
        </p>
      )}
    </div>
  );
};
