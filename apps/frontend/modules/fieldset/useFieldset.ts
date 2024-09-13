import { fieldsets } from "../../data/fieldsets/fieldsets";
import { useEffect, useMemo, useState } from "react";
import { Fieldset } from "./fieldset";
import { FieldsetType } from "./types/fieldset-types";
import * as _ from "lodash";

export const fieldsetStripeWriteAcl = <T>(
  input: any,
  fieldset: FieldsetType,
  roles: string[]
) => {
  //FixMe current implementation stripes without regard to internal fieldsets
  return Object.fromEntries(
    Object.entries(input).filter(([k, v]) => {
      const def = fieldset.find((f) => f.name === k);
      if (roles.find((role) => def?.aclArgs?.write?.includes(role))) {
        return true;
      }
      return false;
    })
  ) as unknown as T;
};

export const useFieldset = <T extends Record<string, unknown>>(props: {
  fieldsetKey: keyof typeof fieldsets;
  allFieldsets: any;
  initialValues: any;
  sdkUpsertMutation: (input: Partial<T>) => void;
  roles: string[];
  preferEdit?: boolean;
  ignoreAclOnSave?: boolean;
  afterSave?: any;
}) => {
  const fieldset = fieldsets[props.fieldsetKey] as FieldsetType;

  const [blinkSaveSuccess, setBlinkSaveSuccess] = useState(false);

  const [values, setValues] = useState<any>(props.initialValues ?? {});
  const setFieldValue = (key: string, value: any) => {
    console.log("setFieldValue", key, value);
    _.set(values, key, value);
    setValues(values);
    console.log(values);
    // return _.;
  };

  const isReadableForRoles = (field: any) =>
    props.roles.find((role) => field.aclArgs?.read?.includes(role));

  const isWriteableForRoles = (field: any) =>
    props.roles.find((role) => field.aclArgs?.write?.includes(role));

  const isViewableForRoles = (field: any) =>
    isReadableForRoles(field) || isWriteableForRoles(field);

  const filterDto = (
    input: Record<string, any>,
    fieldset: typeof fieldsets.fieldsetCrescoCustomer
  ) => {
    return Object.fromEntries(
      Object.entries(input).filter(([key, value]) => {
        return !!fieldset.find((f) => f.name === key);
      })
    );
  };
  const fieldsetViewable = fieldset.filter(isViewableForRoles);
  const fieldsetWritable =
    fieldsets.fieldsetCrescoCustomer.filter(isWriteableForRoles);

  const onSave = () => {
    props.sdkUpsertMutation(
      props.ignoreAclOnSave
        ? values
        : fieldsetStripeWriteAcl(values, fieldset, props.roles)
    );
    props.afterSave && props.afterSave();
    setBlinkSaveSuccess(true);
    setTimeout(() => setBlinkSaveSuccess(false), 2000);
  };
  // const FieldsetInstance = ()=><Fieldset>
  //
  // </Fieldset>

  const FieldsetInstance = () =>
    useMemo(
      () =>
        Fieldset({
          fieldset,
          setFieldValue,
          allFieldsets: props.allFieldsets,
          initialValues: values,
          preferEdit: props.preferEdit,
          roles: props.roles,
        }),
      []
    );
  return {
    debugFieldsetProps: props,
    fieldsetController: {
      onSave,
      blinkSaveSuccess,
      values,
    },
    Fieldset: FieldsetInstance,
  };
};
