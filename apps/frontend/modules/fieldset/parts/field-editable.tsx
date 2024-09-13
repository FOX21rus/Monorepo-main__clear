import { FieldTypeEnum } from "../../../data/graphql/sdk/graphql";
import { Field } from "../types/fieldset-types";
import { CrescoAnnotatedInput } from "../../../components/Hold/styled/cresco/inputs/cresco-input";
import { CrescoElementRouter } from "../../../components/cresco/elements/cresco-element-router";
import { useState } from "react";

export const FieldEditable = ({
  field,
  initialValues,
  roles,
  preferEdit,
  onChangeValue,
}: {
  field: Field;
  initialValues;
  roles?: string[];
  preferEdit?: boolean;
  onChangeValue: (value: any) => void;
}) => {
  const fieldType = field.fieldType as FieldTypeEnum;
  let readonly = true;
  if (!field?.aclArgs?.write && preferEdit) readonly = false;
  if (field && field.aclArgs && roles && preferEdit) {
    readonly = !roles.find(
      (role) => field?.aclArgs && field.aclArgs.write?.includes(role)
    );
  }
  const [value, setValue] = useState<any>(initialValues);
  const onChangeValueInternal = (value: any) => {
    onChangeValue(value);
    setValue(value);
  };
  // const onChangeValue = () => {
  //   setValue(value);
  // };

  return (
    <div>
      {/*<div>ROLES: {roles?.join(", ")}</div>*/}
      {/*<div>prefer edit {preferEdit ? "true" : "false"}</div>*/}
      {/*<div>READ: {field?.aclArgs?.read?.join(", ")}</div>*/}
      {/*<div>WRITE: {field?.aclArgs?.write?.join(", ")}</div>*/}
      {/*<div>readonly:{readonly ? "true" : "false"}</div>*/}

      <CrescoElementRouter
        elementKind={fieldType as any}
        annotation={{ title: field.title, description: field.description }}
        value={value}
        onChangeValue={onChangeValueInternal}
        childrenFieldset={!!field.childrenFieldset}
        readonly={readonly}
      />
    </div>
  );
};
