import { CrescoLayout } from "../../components/Hold/styled/cresco/cresco-layout";
import { CrescoAuthFlow } from "../../components/cresco/modules/auth-flow/cresco-auth-flow";
import { useEffect } from "react";
import { useRouter } from "next/router";

const CrescoLoginPage = () => {
  const Router = useRouter();

  useEffect(() => {
    localStorage.setItem("classicUserMode", "0");
  }, []);
  return (
    <CrescoLayout>
      <CrescoAuthFlow isAdmin={!!Router.query.admin} />
    </CrescoLayout>
  );
};
export default CrescoLoginPage;
