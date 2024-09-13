import { ReactNode } from "react";
import { InputText } from "../../../modules/basic-components/elements/inputs/variants/input-text";
import { InputDate } from "../../../modules/basic-components/elements/inputs/variants/input-date";
import { InputFloat } from "../../../modules/basic-components/elements/inputs/variants/input-float";
import { InputNumber } from "../../../modules/basic-components/elements/inputs/variants/input-number";
import { InputRadioGroup } from "../../../modules/basic-components/elements/inputs/variants/input-radio-group";
import { InputFile } from "../../../modules/basic-components/elements/inputs/variants/input-file";
import { classList } from "../../../utils/classList";
import { InputProps } from "../../../modules/basic-components/elements/inputs/types/input.props";
import { CrescoElementKind } from "./cresco-element-kind";
import { InputTextarea } from "../../../modules/basic-components/elements/inputs/variants/input-textarea";
import {InputPhone} from "../../../modules/basic-components/elements/inputs/variants/input-phone";
import {CrescoManagerSelector} from "../modules/cresco-manager-selector/cresco-manager-selector";

export interface InputAnnotation {
  title: string;
  description?: string;
}
interface propsCrescoInput {
  elementKind: CrescoElementKind;
  annotation: InputAnnotation;
  childrenFieldset?: boolean;
}

export const CrescoElementRouter = (props: propsCrescoInput & InputProps) => {
  let input: ReactNode = null;

  if (props.elementKind === "String")
    input = (
      <InputText
        {...props}
        className={
          "shadow-sm focus:ring-cresco-violet focus:border-ring-cresco-violet block w-full sm:text-sm border-gray-300 rounded-md"
        }
      />
    );
    if (props.elementKind === "Phone")
        input = (
            <InputPhone
                {...props}
                className={
                    "shadow-sm focus:ring-cresco-violet focus:border-ring-cresco-violet block w-full sm:text-sm border-gray-300 rounded-md"
                }
            />
        );

  if (props.elementKind === "MARKDOWN")
    input = (
      <InputTextarea
        {...props}
        className={
          "shadow-sm focus:ring-cresco-violet focus:border-ring-cresco-violet block w-full sm:text-sm border-gray-300 rounded-md"
        }
      />
    );

  if (props.elementKind === "Date")
    input = (
      <InputDate
        {...props}
        className={
          "shadow-sm focus:ring-cresco-violet focus:border-ring-cresco-violet block w-full sm:text-sm border-gray-300 rounded-md"
        }
      />
    );

  if (props.elementKind === "Float")
    input = (
      <InputFloat
        {...props}
        className={
          "shadow-sm focus:ring-cresco-violet focus:border-ring-cresco-violet block w-full sm:text-sm border-gray-300 rounded-md"
        }
      />
    );

  if (props.elementKind === "Int")
    input = (
      <InputNumber
        {...props}
        className={
          "shadow-sm focus:ring-cresco-violet focus:border-ring-cresco-violet block w-full sm:text-sm border-gray-300 rounded-md"
        }
      />
    );

  if (props.elementKind === "Boolean")
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
  if (props.elementKind === "FILE_URLS")
    input = <InputFile {...props} className={""} single={false} />;

  if (props.elementKind === "FILE_URL")
    input = <InputFile {...props} className={""} single={true} />;

    if (props.elementKind === "CrescoManagerSelector")
        input = <CrescoManagerSelector {...props} />;

  if (!input) input = <p>{props.elementKind}</p>;

  return (
    <CrescoInputAnnotationWrapper
      annotation={props.annotation}
      childrenFieldset={props.childrenFieldset}
      readonly={props.readonly}
    >
      {input}
    </CrescoInputAnnotationWrapper>
  );

  return <div>{props.elementKind}</div>;
};

const CrescoInputAnnotationWrapper = ({
  annotation,
  children,
  childrenFieldset,
  readonly,
}: {
  annotation: InputAnnotation;
  children: ReactNode;
  childrenFieldset?: boolean;
  readonly?: boolean;
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
      {annotation.description && !readonly && (
        <p className="mt-2 text-sm text-gray-500" id="email-description">
          {annotation.description}
        </p>
      )}
    </div>
  );
};
