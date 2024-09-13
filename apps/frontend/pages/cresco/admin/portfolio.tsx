import { useEffect, useState } from "react";
import { sdk } from "../../../data/graphql/sdk";
import { CrescoLayoutCabinet } from "../../../components/Hold/styled/cresco/cresco-layout-cabinet";
import { CrescoAnnotatedInput } from "../../../components/Hold/styled/cresco/inputs/cresco-input";
import { CrescoButton } from "../../../components/cresco/blocks/buttons/cresco-button";
import { CrescoCurrency } from "../../../components/Hold/styled/cresco/cresco-currency/cresco-currency";
import { useCrescoTabs } from "../../../components/Hold/styled/cresco/cresco-tabs";
import { CrescoCoinRateWidget } from "../../../components/cresco/modules/cresco-coin-rate-chart/cresco-coin-rate.widget";
import { CrescoPortfolioStateWidget } from "../../../components/cresco/modules/cresco-portfolio-state/cresc-portfolio-state.widget";

const CrescoPageCabinetPortfolio = () => {
  return (
    <CrescoLayoutCabinet title={"Current Portfolio State"} isAdmin={true}>
      <CrescoPortfolioStateWidget canEdit={true} />
    </CrescoLayoutCabinet>
  );
};
export default CrescoPageCabinetPortfolio;
