import { CrescoCustomerProfileWidget } from "../../../components/cresco/modules/cresco-customer/cresco-customer-profile.widget";
import { CrescoLayoutCabinet } from "../../../components/Hold/styled/cresco/cresco-layout-cabinet";
import { sdk } from "../../../data/graphql/sdk";
import { useLocalStorage } from "../../../utils/hooks/use-local-storage";
import { useEffect, useState } from "react";

const CrescoPageCabinetProfile = () => {
  //ToDo: input to fieldsets
  //Files field editable only for admins
  const [agreementNo, setAgreementNo] = useLocalStorage("token", undefined);
  const [data, setData] = useState<any>();
  useEffect(() => {
    sdk()
      .crescoGetDepositInfoByAgreementNumber({ agreementNo })
      .then((d) => {
        setData(d.crescoGetDepositInfoByAgreementNumber);
        // if (d?.crescoGetDepositInfoByAgreementNumber?.["USD"]?.depositNo)
        //   propsCrescoTabs.setActiveTab("USD");
        // else if (d?.crescoGetDepositInfoByAgreementNumber?.["RUB"]?.depositNo)
        //   propsCrescoTabs.setActiveTab("RUB");
        // else if (d?.crescoGetDepositInfoByAgreementNumber?.["EUR"]?.depositNo)
        //   propsCrescoTabs.setActiveTab("EUR");
      });
  }, [agreementNo]);

  if (!data) return null;

  return (
    <CrescoLayoutCabinet title={"Your Profile"} isAdmin={false}>
      <div className={"ml-10"}>
        <p>
          <span className={"font-bold"}>Клиент:</span>{" "}
          {data?.attributed?.[0]?.fio}
        </p>
        <p>
          <span className={"font-bold"}>Номер договора</span>{" "}
          {data?.attributed?.[0]?.agreementNo}
        </p>
      </div>
    </CrescoLayoutCabinet>
  );
};
export default CrescoPageCabinetProfile;
