import { CrescoLayoutCabinet } from "../../../components/Hold/styled/cresco/cresco-layout-cabinet";
import { useCrescoTabs } from "../../../components/Hold/styled/cresco/cresco-tabs";
import {
  CrescoAlert,
  CrescoAlertGreen,
} from "../../../components/Hold/styled/cresco/cresco-alert";
import { sdk } from "../../../data/graphql/sdk";
import moment from 'moment'
import 'moment/locale/ru'  // without this line it didn't work
moment.locale('ru')

const CrescoPageCabinetNotifications = () => {
  const { propsCrescoTabs, activeTab } = useCrescoTabs(
    ["USD", "EUR", "RUB"],
    "USD"
  );
  const { data } = sdk().useCrescoCustomerMyNotificationsList();
  const notifications = (data?.crescoCustomerMyNotificationsList ?? [])
    // .filter((n) => n.createdAt)
    .sort((n1, n2) =>
      new Date(n1.createdAt).valueOf() < new Date(n2.createdAt).valueOf()
        ? 1
        : -1
    );

  return (
    <CrescoLayoutCabinet title={"Notifications"} isAdmin={false}>
      {notifications.map((notification, i) => {
        const emotion = notification.emotion || 0;
        return (
          <div className={"mt-5"} key={i}>
            <CrescoAlert
              variant={emotion > 0 ? "GREEN" : emotion < 0 ? "RED" : "BASIC"}
              text={
                <>
                  {notification.title && (
                    <p className={"font-bold  cursor-pointer"}>
                      {notification.title}
                    </p>
                  )}
                  {notification.text}
                  {notification.cta && (
                    <a
                      className={
                        "font-bold underline underline-offset-2 cursor-pointer"
                      }
                      href={notification.ctaUrl ?? ""}
                    >
                      {" "}
                      {notification.cta}
                    </a>
                  )}
                  <p className={"text-xs text-gray-600"}>{moment(notification.createdAt).format('LLL').replace('г.,','')}</p>
                </>
              }
            />
          </div>
        );
      })}
    </CrescoLayoutCabinet>
  );
};
export default CrescoPageCabinetNotifications;
