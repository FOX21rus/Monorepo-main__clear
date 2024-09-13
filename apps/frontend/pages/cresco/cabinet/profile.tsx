import { CrescoCustomerProfileWidget } from "../../../components/cresco/modules/cresco-customer/cresco-customer-profile.widget";
import { CrescoLayoutCabinet } from "../../../components/Hold/styled/cresco/cresco-layout-cabinet";
import { CrescoButton } from "../../../components/cresco/blocks/buttons/cresco-button";

const CrescoPageCabinetProfile = () => {
  //ToDo: input to fieldsets
  //Files field editable only for admins
  return (
    <CrescoLayoutCabinet title={"Your Profile"} isAdmin={false}>
      <div className={"ml-10"}>
        {/*<div>*/}
        {/*  <CrescoButton*/}
        {/*    variant={"BASIC"}*/}
        {/*    className={"my-5"}*/}
        {/*    onClick={() => (document.location.href = "contacts")}*/}
        {/*  >*/}
        {/*    Contact manager*/}
        {/*  </CrescoButton>*/}
        {/*</div>*/}
        <CrescoCustomerProfileWidget />
      </div>
    </CrescoLayoutCabinet>
  );
};
export default CrescoPageCabinetProfile;
