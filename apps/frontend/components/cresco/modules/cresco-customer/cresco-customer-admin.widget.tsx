import { PropsWidget } from "modules/basic-components/widgets/types/props-widget";
import { sdk } from "../../../../data/graphql/sdk";
import { CrescoCustomerLayout } from "./cresco-customer.layout";
import { DataLoadingPlaceholder } from "../../blocks/data-loading-placeholder";

export const CrescoCustomerAdminWidget = (
  props: PropsWidget & { userUri: string }
) => {
  const { data, mutate } = sdk().useCrescoAdminGetCustomerProfile({
    userUri: props.userUri,
  });
  const profile = data?.crescoAdminGetCustomerProfile;

  if (!profile) return <DataLoadingPlaceholder />;
  return (
    <div>
      <CrescoCustomerLayout
        mode={"ADMIN_VIEW"}
        customer={profile}
        mutateCustomer={mutate}
      />
    </div>
  );
};
