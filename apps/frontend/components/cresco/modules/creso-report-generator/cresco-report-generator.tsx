import { useState } from "react";
import { useFieldset } from "../../../../modules/fieldset/useFieldset";
import { fieldsets } from "../../../../data/fieldsets/fieldsets";
import { sdk } from "../../../../data/graphql/sdk";
import { CrescoButton } from "../../blocks/buttons/cresco-button";
import { InputText } from "../../../../modules/basic-components/elements/inputs/variants/input-text";
import { InputDate } from "../../../../modules/basic-components/elements/inputs/variants/input-date";
import moment from "moment";
import { CrescoInputAnnotationWrapper } from "../../../Hold/styled/cresco/inputs/cresco-input";
import { BACKEND_URL } from "data/graphql/config";

export const CrescoReportGenerator = ({ userUri, lastName }) => {
  const [show, setShow] = useState(false);
  const [sent, setSent] = useState(false);
  const [from, setFrom] = useState(moment().subtract(7, "days").toDate());
  const [to, setTo] = useState(new Date());
  const dateStrToRusDate = (dateStr: string | Date) => {
    return moment(dateStr).format("DD.MM.YYYY");
  };
  if (!show)
    return (
      <div className={"mb-5"}>
        {sent && (
          <p className={"text-cresco-green-600 mb-3"}>Notification Sent!</p>
        )}
        <CrescoButton
          variant={"BASIC"}
          onClick={() => {
            setShow(true);
          }}
        >
          Generate report
        </CrescoButton>
      </div>
    );
  return (
    <div>
      <div className={"my-5"}>
        <div className={"mb-5"}>
          <CrescoInputAnnotationWrapper
            annotation={{
              title: "From date",
            }}
          >
            <InputDate value={from} onChangeValue={setFrom} />
          </CrescoInputAnnotationWrapper>
        </div>
        <div className={"mb-5"}>
          <CrescoInputAnnotationWrapper
            annotation={{
              title: "To date",
            }}
          >
            <InputDate value={to} onChangeValue={setTo} />
          </CrescoInputAnnotationWrapper>
        </div>
        <div>
          <a
            download
            href={`${BACKEND_URL}/api/cresco-generate-report/crypto/scha-${dateStrToRusDate(
              to
            )}.xlsx?userUri=${userUri}&from=${dateStrToRusDate(
              from
            )}&to=${dateStrToRusDate(to)}`}
          >
            <CrescoButton variant={"BASIC"}>Generate Full Report</CrescoButton>
          </a>
        </div>
        <div className={"mt-2"}>
          <a
            download
            href={`${BACKEND_URL}/api/cresco-generate-report/dynamics/${lastName}-d-${dateStrToRusDate(
              to
            )}.xlsx?userUri=${userUri}&from=${dateStrToRusDate(
              from
            )}&to=${dateStrToRusDate(to)}`}
          >
            <CrescoButton variant={"LINK"}>
              Generate Fund Report
            </CrescoButton>
          </a>
        </div>
      </div>
    </div>
  );
};
