import { Fragment } from "react";
import { FieldsetChildren } from "./parts/fieldset-children";
import { FieldEditable } from "./parts/field-editable";
import { FieldsetType } from "./types/fieldset-types";

export const Fieldset = (props: {
  fieldset: FieldsetType;
  allFieldsets: Record<string, FieldsetType>;
  setFieldValue: (key: string, value: any) => void;
  initialValues: Record<string, unknown>;
  roles?: string[];
  preferEdit?: boolean;
}) => {
  return (
    <div className={"grid gap-5"}>
      {/*<br />*/}
      {/*Fieldset props values {JSON.stringify(props.initialValues)}*/}
      {/*Fieldset defs {JSON.stringify(props.fieldset)}*/}
      {/*<br />*/}
      {/*Prefer edit: {props.preferEdit ? "yes" : "no"}*/}
      {props.fieldset?.map((fld) => (
        <Fragment key={fld.name}>
          <FieldEditable
            onChangeValue={(value: any) => props.setFieldValue(fld.name, value)}
            key={fld.name}
            field={fld}
            initialValues={props.initialValues?.[fld.name]}
            roles={props.roles}
            preferEdit={props.preferEdit}
          />
          {fld.childrenFieldset && (
            <FieldsetChildren
              allFieldsets={props.allFieldsets}
              childrenFieldset={fld.childrenFieldset}
              setFieldValue={props.setFieldValue}
              initialValues={props.initialValues?.[fld.name]}
              roles={props.roles}
              preferEdit={props.preferEdit}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
};
