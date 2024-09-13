import Link from "next/link";
import { sdk } from "../../../data/graphql/sdk";
import { User } from "../../../data/graphql/sdk/graphql";
import { CrescoLayoutCabinet } from "../../../components/Hold/styled/cresco/cresco-layout-cabinet";
import { CrescoButton } from "../../../components/cresco/blocks/buttons/cresco-button";

const CrescoPageCabinetAdmins = () => {
  return (
    <CrescoLayoutCabinet title={"Admins"} isAdmin={true}>
      <p className={"mb-3"}>
        Ask new admin to pass registration{" "}
        <Link href={"/cresco/login?admin=true"}>
          <a className={"text-cresco-green-600 underline underline-offset-2"}>
            here
          </a>
        </Link>{" "}
      </p>
      <p>Set admin roles for users</p>
      <CrescoAdminList />
    </CrescoLayoutCabinet>
  );
};

const CrescoAdminList = () => {
  const { data, mutate } = sdk().useCrescoAdminGetAdminList();
  const admins = data?.crescoAdminGetAdminList ?? [];
  return (
    <div>
      {admins.map((admin) => (
        <CrescoAdmin key={admin.email} admin={admin} mutate={mutate} />
      ))}
    </div>
  );
};
const CrescoAdmin = ({ admin, mutate }: { admin: User; mutate: any }) => {
  const userUri = `email://${admin.email}`;
  const isSuperAdmin = admin.roles?.includes("super_admin");
  const isAdmin = !isSuperAdmin && admin.roles?.includes("admin");
  const isDismissed = admin.roles?.includes("dismissed");
  const makeSuperAdmin = () => {
    sdk()
      .crescoAdminSetAdminRoles({ userUri, roles: ["super_admin", "admin"] })
      .then(mutate);
  };
  const makeAdmin = () => {
    sdk()
      .crescoAdminSetAdminRoles({ userUri, roles: ["admin"] })
      .then(mutate);
  };
  const dismiss = () => {
    sdk()
      .crescoAdminSetAdminRoles({ userUri, roles: ["dismissed"] })
      .then(mutate);
  };

  return (
    <div className={"py-3 my-3 border-b"}>
      <p>
        <span>
          {isSuperAdmin && (
            <span
              className={
                "bg-rose-400 text-white py-0.5 text-sm px-1 rounded-sm"
              }
            >
              super admin
            </span>
          )}
          {isAdmin && (
            <span
              className={
                "bg-cresco-green-600 text-sm text-white px-1 py-0.5rounded-sm"
              }
            >
              admin
            </span>
          )}
          {isDismissed && (
            <span
              className={
                "bg-gray-400 text-sm text-white px-1 py-0.5 rounded-sm"
              }
            >
              dismissed
            </span>
          )}
        </span>
        <br />
        {admin.email}
      </p>
      <p className={"flex"}>
        {isSuperAdmin && (
          <CrescoButton
            variant={"LINK"}
            onClick={makeAdmin}
            className={"text-cresco-green-600"}
          >
            Make admin
          </CrescoButton>
        )}
        {isAdmin && (
          <CrescoButton
            variant={"LINK"}
            onClick={makeSuperAdmin}
            className={"text-rose-800"}
          >
            Make super admin
          </CrescoButton>
        )}
        {!isDismissed && (
          <CrescoButton
            variant={"LINK"}
            onClick={dismiss}
            className={"text-gray-400"}
          >
            Dismiss
          </CrescoButton>
        )}
        {isDismissed && !isAdmin && (
          <CrescoButton
            variant={"LINK"}
            onClick={makeAdmin}
            className={"text-cresco-green-600"}
          >
            Make admin
          </CrescoButton>
        )}
      </p>
    </div>
  );
};

export default CrescoPageCabinetAdmins;
