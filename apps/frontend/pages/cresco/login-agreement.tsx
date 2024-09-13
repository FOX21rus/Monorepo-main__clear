import { CrescoLayout } from "../../components/Hold/styled/cresco/cresco-layout";
import { CrescoAuthFlow } from "../../components/cresco/modules/auth-flow/cresco-auth-flow";
import { CrescoSignInByAgreementForm } from "../../components/cresco/modules/auth-flow/cresco-sign-in-by-agreement-form";
import { useEffect } from "react";
import Script from "next/script";

const CrescoLoginPage = () => {
  useEffect(() => {
    localStorage.setItem("classicUserMode", "0");
  }, []);
  return (
    <CrescoLayout>
      {/*<Script src="https://app.telegram-feedback.com/chat.js?wid=3805f59e-beef-4c8c-94bc-73338543a784"></Script>*/}
      <CrescoSignInByAgreementForm />
    </CrescoLayout>
  );
};
export default CrescoLoginPage;
