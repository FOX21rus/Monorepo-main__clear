import { sdk } from "../../../data/graphql/sdk";
import { CrescoCustomer } from "../../../data/graphql/sdk/graphql";
import { fieldsets } from "../../../data/fieldsets/fieldsets";
import { SideOver, useSideOver } from "../../../components/Hold/ui/side-over";
import { CrescoLayoutCabinet } from "../../../components/Hold/styled/cresco/cresco-layout-cabinet";
import { CrescoCustomerView } from "../../../components/Hold/styled/cresco/cresco-customer/cresco-customer";
import { CrescoNotificationSender } from "../../../components/Hold/styled/cresco/cresco-notification/cresco-notification-sender";
import {
  CrescoTabs,
  useCrescoTabs,
} from "../../../components/Hold/styled/cresco/cresco-tabs";
import { CrescoCustomerAdminWidget } from "../../../components/cresco/modules/cresco-customer/cresco-customer-admin.widget";
import { CrescoButton } from "../../../components/cresco/blocks/buttons/cresco-button";
import { CrescoReportGenerator } from "../../../components/cresco/modules/creso-report-generator/cresco-report-generator";
import { CrescoAnnotatedInput } from "../../../components/Hold/styled/cresco/inputs/cresco-input";
import { useState } from "react";

const CrescoPageCabinetDeposits = () => {
  const { propsCrescoTabs, activeTab } = useCrescoTabs(
    ["Verified", "Unverified"],
    "Verified"
  );
  const { data: customersData, mutate } = sdk().useCrescoAdminGetCustomerList();
  const customers = customersData?.crescoAdminGetCustomerList ?? [];

  const verified = customers.filter((c) => c.isPassportVerified);
  const unverified = customers.filter((c) => !c.isPassportVerified);

  return (
    <CrescoLayoutCabinet title={"Customers"} isAdmin={true}>
      <CrescoTabs {...propsCrescoTabs} activeTab={activeTab} />
      <div className={"mt-5"}>
        {activeTab === "Verified" && (
          <div>
            {verified.map((customer) => (
              <CrescoCustomerAdmin
                key={customer.userUri}
                customer={customer}
                mutate={mutate}
              />
            ))}
          </div>
        )}
        {activeTab === "Unverified" && (
          <div>
            {unverified.map((customer) => (
              <CrescoCustomerAdmin
                key={customer.userUri}
                customer={customer}
                mutate={mutate}
              />
            ))}
          </div>
        )}
      </div>
    </CrescoLayoutCabinet>
  );
};

const CrescoCustomerAdmin = ({
  customer,
  mutate,
}: {
  customer: CrescoCustomer;
  mutate;
}) => {
  //Short description
  //Edit in panel
  const { propsSideOver, setOpen } = useSideOver({
    title: "Customer",
  });
  return (
    <div>
      <SideOver {...propsSideOver}>
        <div>
          <div className={"my-3 py-3 border-b"}>
            <CrescoNotificationSender userUri={customer.userUri} />
            <div className={"mt-5"}>
              <CrescoReportGenerator
                userUri={customer.userUri}
                lastName={customer.lastName}
              />
            </div>
          </div>

          <CrescoCustomerAdminWidget userUri={customer.userUri as string} />
        </div>
      </SideOver>
      <CustomerShort
        customer={customer}
        onClick={() => {
          setOpen(true);
        }}
      />
    </div>
  );
};
const CustomerShort = ({
  customer,
  onClick,
}: {
  customer: CrescoCustomer;
  onClick;
}) => {
  const fio = customer.lastName
    ? `${customer.firstName ?? "Имя не задано"} ${customer.middleName ?? ""} ${
        customer.lastName ?? "Фамилия не задана"
      }`
    : "Name not set";
  return (
    <div className={"px-3 py-3 border-b cursor-pointer  "} onClick={onClick}>
      <p className={"font-medium text-cresco-green-600"}>{fio}</p>
      <p className={"text-sm"}>Cresco Tokens: {customer.crescoTokenBalance}</p>
    </div>
  );
};

export default CrescoPageCabinetDeposits;
