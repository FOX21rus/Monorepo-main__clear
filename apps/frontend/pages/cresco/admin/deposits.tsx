import axios from "axios";
import { BACKEND_URL } from "../../../data/graphql/config";
import { useState } from "react";
import { useCrescoTabs } from "../../../components/Hold/styled/cresco/cresco-tabs";
import { CrescoLayoutCabinet } from "../../../components/Hold/styled/cresco/cresco-layout-cabinet";
import { CrescoAnnotatedInput } from "../../../components/Hold/styled/cresco/inputs/cresco-input";

const CrescoPageCabinetDeposits = () => {
  const { propsCrescoTabs, activeTab } = useCrescoTabs(
    ["USD", "EUR", "RUB"],
    "USD"
  );
  const [success, setSuccess] = useState<undefined | boolean>();
  const [agreementNo, setAgreementNo] = useState("");
  const [token, setToken] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e?.target?.files?.[0];
    if (f) {
      const formData = new FormData();
      formData.append("file", f, f.name);
      // formData.append("resizeImage", props.image ? "true" : "false");
      axios
        .post(`${BACKEND_URL}/api/cresco/admin/upload-deposits-table`, formData)
        .then((d: any) => {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(undefined);
          }, 5000);
          console.log("uploaded");
          // field.onChange({
          //     target: {
          //         name: props.name,
          //         value: [
          //             ...(props.single ? [] : value),
          //             { url: d?.data?.Location, name: f.name },
          //         ],
          //     },
          // });
        })
        .catch(() => setSuccess(false));
    }
  };
  const getToken = (agreementNo) => {
    axios
      .get(
        `${BACKEND_URL}/api/admin/dief0fee2uw7ahBaicho8ahb4ahb3eey/getPass?agreementNo=${agreementNo}`
      )
      .then((d) => d.data)
      .then((d) => setToken(d));
  };

  return (
    <CrescoLayoutCabinet title={"Deposits"} isAdmin={true}>
      <p className={"mb-3"}>Add fresh version of xlsx deposits file</p>
      <div>
        <label
          htmlFor="file-upload"
          className="relative cursor-pointer bg-white rounded-md font-medium text-cresco-green-600 hover:text-cresco-green-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-cresco-green-400"
        >
          <span>Upload a file</span>
          <input
            onChange={onChange}
            id="file-upload"
            name="file-upload"
            type="file"
            className="sr-only"
            accept={
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            }
          />
        </label>
        {/*<p className="pl-1">or drag and drop</p>*/}
      </div>
      <p className="text-xs text-gray-500">Accepting .xslx only</p>
      {success && (
        <p className={"text-cresco-green-600 pt-3"}>
          Deposits successfully updated
        </p>
      )}
      {success === false && (
        <p className={"text-red-500 pt-3"}>Deposits update failure</p>
      )}
      <div className={"mt-5"}>
        <CrescoAnnotatedInput
          type={"String"}
          annotation={{
            title: "Generate token by Agreement #",
            description: "Paste agreement number exactly as in table",
          }}
          value={agreementNo}
          onChangeValue={(value) => {
            setAgreementNo(value);
            if (value.match("от")) {
              getToken(value);
            }
          }}
        />

        {token && <p className={"mt-2"}>Send this token to client: {token}</p>}
      </div>
    </CrescoLayoutCabinet>
  );
};
export default CrescoPageCabinetDeposits;

const StatLine = ({ title, children }) => {
  return (
    <p>
      <span className={"text-cresco-violet"}>{title}</span>
      {": "}
      <span className={"text-gray-500"}>{children}</span>
    </p>
  );
};
