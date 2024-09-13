import { fieldsets } from "../../../../../data/fieldsets/fieldsets";
import { sdk } from "../../../../../data/graphql/sdk";
import { CrescoButton } from "../../../../cresco/blocks/buttons/cresco-button";
import { Fieldset } from "../../../../../modules/fieldset/fieldset";
import { useState } from "react";
import { useFieldset } from "../../../../../modules/fieldset/useFieldset";

export const CrescoNotificationSender = ({ userUri }) => {
  const [show, setShow] = useState(false);
  const [sent, setSent] = useState(false);
    const [broadcast,setBroadcast] = useState(false)

  const { Fieldset, fieldsetController } = useFieldset({
    allFieldsets: fieldsets,
    fieldsetKey: "fieldsetCrescoNotification",
    sdkUpsertMutation: (input: any) =>
      sdk().crescoAdminSendNotification({ input: { ...input, userUri }, isBroadcast:broadcast }),
    initialValues: {},
    roles: ["admin"],
    preferEdit: true,
    ignoreAclOnSave: true,
  });

  if (!show)
    return (
      <div className={"mb-5"}>
        {sent && (
          <p className={"text-cresco-green-600 mb-3"}>Notification Sent!</p>
        )}
        <CrescoButton
          variant={"BASIC"}
          onClick={() => {
              setBroadcast(false);
            setShow(true);
          }}
        >
          Send notification
        </CrescoButton>
          <CrescoButton
              variant={"BASIC"}
              onClick={() => {
                  setShow(true);
                  setBroadcast(true);
              }}
          >
              Send to everyone
          </CrescoButton>
      </div>
    );
  return (
    <div>
        {broadcast&&<p className={"my-3 text-red-500"}>Warning: this notification will be sent to all users</p>}
      <Fieldset />
      <div className={"my-5"}>
        <CrescoButton
          variant={"BASIC"}
          onClick={() => {
            fieldsetController.onSave();
            setSent(true);
            setShow(false);
          }}
        >
          Send
        </CrescoButton>
      </div>
    </div>
  );
};
