import { CrescoPortfolioStateLayout } from "./cresc-portfolio-state.layout";
import { sdk } from "../../../../data/graphql/sdk";

export const CrescoPortfolioStateWidget = ({
  canEdit,
}: {
  canEdit: boolean;
}) => {
  const { data, mutate } = sdk().useCrescoAdminGetLastPortfolioState();
  const state = data?.crescoAdminGetLastPortfolioState;

  const { data:profileData } = sdk().useCrescoCustomerGetMyProfile();

  const profile = profileData?.crescoCustomerGetMyProfile?.crescoTokenBalance;

  const { data: dataRate } = sdk().useCrescoGetCurrentCrescoTokenRate();
  const share = (profileData?.crescoCustomerGetMyProfile?.crescoTokenBalance??0) / (dataRate?.crescoGetCurrentCrescoTokenRate?.crescoTokensAmount ?? 1);

  const { data: cData } = sdk().useCrescoGetExternalCoinsRates();
  const rates = cData?.crescoGetExternalCoinsRates ?? [];
  if (!state || !rates) return null;
  return (
    <CrescoPortfolioStateLayout
      canEdit={canEdit}
      state={state}
      rates={rates}
      mutatePortfolioState={mutate}
      share={canEdit?1:share}
    />
  );
};
