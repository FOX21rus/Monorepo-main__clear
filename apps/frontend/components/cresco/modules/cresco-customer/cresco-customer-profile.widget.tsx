import { PropsWidget } from "modules/basic-components/widgets/types/props-widget";
import { sdk } from "../../../../data/graphql/sdk";
import { CrescoCustomerLayout } from "./cresco-customer.layout";
import { DataLoadingPlaceholder } from "../../blocks/data-loading-placeholder";

export const CrescoCustomerProfileWidget = (props: PropsWidget) => {
  const { data, mutate } = sdk().useCrescoCustomerGetMyProfile();
  const profile = data?.crescoCustomerGetMyProfile;

  if (!profile) return <DataLoadingPlaceholder />;
  return (
    <div>
      <CrescoCustomerLayout
        mode={"OWN_VIEW"}
        customer={profile}
        mutateCustomer={mutate}
      />
    </div>
  );
};
