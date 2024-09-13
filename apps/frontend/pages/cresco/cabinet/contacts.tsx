import { CrescoCustomerProfileWidget } from "../../../components/cresco/modules/cresco-customer/cresco-customer-profile.widget";
import { CrescoLayoutCabinet } from "../../../components/Hold/styled/cresco/cresco-layout-cabinet";
import { sdk } from "../../../data/graphql/sdk";
import { crescoManagersData } from "../../../components/cresco/modules/cresco-manager-selector/cresco-managers.data";
import { SingleManagerView } from "../../../components/cresco/modules/cresco-manager-selector/cresco-manager-selector";
import { useLocalStorage } from "../../../utils/hooks/use-local-storage";

const CrescoPageCabinetContacts = () => {
  //ToDo: input to fieldsets
  //Files field editable only for admins
  const { data } = sdk().useCrescoCustomerGetMyProfile();

  const manager = data?.crescoCustomerGetMyProfile?.managerFullName;
  const selectedManager = crescoManagersData.find(
    (d) => d.fullName === manager
  );
  const [classicUserMode, setClassicUSerMode] = useLocalStorage(
    "classicUserMode",
    "0"
  );

  const defaultManager = {
    fullName: "Прошкинас Татьяна Сергеевна",
    phone: "8(926)384-38-08",
    email: "t.proshkinas@crescofinance.pro",
    avatarUrl: "/cresco/team/pt.jpg",
  };
  return (
    <CrescoLayoutCabinet title={"Contacts"} isAdmin={false}>
      <div className={"ml-10"}>
        {!!!classicUserMode && <p>Email: info@cresco.capital</p>}
        {!!classicUserMode && (
          <div>
            {/*<p>Email: diamonddelphinius@gmail.com</p>*/}
            <div>
              <SingleManagerView manager={defaultManager} onClick={() => {}} />
            </div>
          </div>
        )}

        {!!!classicUserMode && selectedManager && (
          <SingleManagerView manager={selectedManager} onClick={() => {}} />
        )}
      </div>
    </CrescoLayoutCabinet>
  );
};
export default CrescoPageCabinetContacts;
