import { crescoManagersData } from "./cresco-managers.data";
import { useState } from "react";

export const CrescoManagerSelector = (props: {
  value: string;
  onChangeValue: any;
  readonly?: boolean;
}) => {
  const selectedManager = crescoManagersData.find(
    (d) => d.fullName === props.value
  );
  const [select, setSelect] = useState(false);

  if (!selectedManager && props.readonly) return <div>Manager not set</div>;

  if (selectedManager && props.readonly)
    return <SingleManagerView manager={selectedManager} onClick={() => {}} />;

  return (
    <div>
      {/*<p>Chosen manager</p>*/}
      {selectedManager && (
        <SingleManagerView manager={selectedManager} onClick={() => {}} />
      )}
      {!select && (
        <div>
          <a
            className={"text-cresco-green-600 cursor-pointer"}
            onClick={() => setSelect(true)}
          >
            Change manager
          </a>
        </div>
      )}
      {select && (
        <div>
          <p>Select manager</p>
          {crescoManagersData
            .filter((s) => s.fullName !== props.value)
            .map((m) => (
              <SingleManagerView
                manager={m}
                key={m.fullName}
                onClick={() => {
                  props.onChangeValue(m.fullName);
                  setSelect(false);
                }}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export const SingleManagerView = ({
  manager,
  onClick,
}: {
  manager: (typeof crescoManagersData)[0];
  onClick: any;
}) => {
  return (
    <div className={"flex my-5"} onClick={onClick}>
      <div className={"w-20 mr-2"}>
        <img className={""} src={manager.avatarUrl} />
      </div>
      <div>
        <p>{manager.fullName}</p>
        <p className={"text-sm text-gray-600"}>{manager.phone} (WhatsApp)</p>
        <p className={"text-sm text-gray-600"}>{manager.email}</p>
      </div>
    </div>
  );
};
