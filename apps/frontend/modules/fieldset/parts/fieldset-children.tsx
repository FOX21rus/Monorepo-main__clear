import { fieldsets } from "../../../data/fieldsets/fieldsets";
import { Fieldset } from "../fieldset";
import { Field, FieldsetType } from "../types/fieldset-types";

export const FieldsetChildren = (props: {
  initialValues;
  allFieldsets: Record<string, FieldsetType>;
  setFieldValue: (key: string, value: any) => void;
  childrenFieldset: Field["childrenFieldset"];
  roles?: string[];
  preferEdit?: boolean;
}) => {
  if (!props.childrenFieldset) return null;

  if (props.childrenFieldset.isList)
    return (
      <div>
        {props.initialValues?.map((value, i) => (
          <div key={i} className={"pl-3 border-t -mt-3 pt-3 max-w-xl"}>
            <Fieldset
              allFieldsets={props.allFieldsets}
              fieldset={props.allFieldsets[props.childrenFieldset.name]}
              setFieldValue={props.setFieldValue}
              initialValues={value}
              roles={props.roles}
              preferEdit={props.preferEdit}
            />
          </div>
        ))}
      </div>
    );

  if (!props.childrenFieldset.isList)
    return (
      <div className={"pl-3 border-t -mt-3 pt-3 max-w-xl"}>
        <Fieldset
          allFieldsets={props.allFieldsets}
          fieldset={props.allFieldsets[props.childrenFieldset.name]}
          setFieldValue={props.setFieldValue}
          initialValues={props.initialValues}
          roles={props.roles}
          preferEdit={props.preferEdit}
        />
      </div>
    );
  return null;
};
