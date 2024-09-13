import { CrescoPublicationsFeed } from "../../../components/cresco/modules/cresco-publications/cresco-publications.feed";
import { CrescoLayoutCabinet } from "../../../components/Hold/styled/cresco/cresco-layout-cabinet";

const PageAnalytics = () => {
  return (
    <CrescoLayoutCabinet title={"Analytics"} isAdmin={true}>
      <CrescoPublicationsFeed canAddNew={true} />
    </CrescoLayoutCabinet>
  );
};
export default PageAnalytics;
