import { PropsLayout } from "modules/basic-components/layouts/types/props-layout";
import { useFieldset } from "modules/fieldset/useFieldset";
import { CrescoCustomer } from "../../../../data/graphql/sdk/graphql";
import { FnMutateType } from "../../../../modules/basic-components/common-types/fn-mutate.type";
import { sdk } from "../../../../data/graphql/sdk";
import { CrescoButton } from "../../blocks/buttons/cresco-button";
import { fieldsets } from "../../../../data/fieldsets/fieldsets";

export const CrescoCustomerLayout = (
  props: PropsLayout & {
    mode: "OWN_VIEW" | "ADMIN_VIEW";
    customer: CrescoCustomer;
    mutateCustomer: FnMutateType;
  }
) => {
  const {
    Fieldset: FieldsetCustomer,
    fieldsetController: customerController,
    debugFieldsetProps,
  } = useFieldset<CrescoCustomer>({
    allFieldsets: fieldsets,
    fieldsetKey: "fieldsetCrescoCustomer",
    initialValues: props.customer,
    sdkUpsertMutation: (customerDto: any) =>
      props.mode === "OWN_VIEW"
        ? sdk().crescoCustomerUpsertMyProfile({ input: customerDto })
        : sdk().crescoAdminUpsertCustomerProfile({
            input: { ...customerDto, userUri: props?.customer?.userUri },
          }),

    roles: [
      "all",
      props.mode === "OWN_VIEW" && "customer",
      props.mode === "ADMIN_VIEW" && "admin",
    ].filter(Boolean) as string[],
    preferEdit: true,
  });
  return (
    <div>
      {/*debugFieldsetProps: {JSON.stringify(debugFieldsetProps)}*/}
        {<p className={"my-3"}>{props.customer?.userUri?.replace("email://","")}</p>}
        {<p className={"my-3"}>{props.customer?.phone}</p>}
      <FieldsetCustomer />
      <div className={"mt-5"}>
        {!customerController.blinkSaveSuccess && (
          <CrescoButton variant={"BASIC"} onClick={customerController.onSave}>
            Save
          </CrescoButton>
        )}
        {customerController.blinkSaveSuccess && (
          <p className={"text-cresco-green-600"}>Successfully saved</p>
        )}
      </div>
    </div>
  );
};
