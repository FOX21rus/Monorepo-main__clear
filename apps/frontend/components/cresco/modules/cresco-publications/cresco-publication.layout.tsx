import {
  CrescoCustomer,
  CrescoPublication,
} from "../../../../data/graphql/sdk/graphql";
import { useFieldset } from "../../../../modules/fieldset/useFieldset";
import { fieldsets } from "../../../../data/fieldsets/fieldsets";
import { sdk } from "../../../../data/graphql/sdk";
import { CrescoButton } from "../../blocks/buttons/cresco-button";
import { CrescoPublicationView } from "./cresco-publication.view";
import { useState } from "react";
import { CrescoPublicationInput } from "./cresco-publication.input";

export enum CrescoPublicationLayoutModes {
  "VIEW" = "VIEW",
  "EDITABLE" = "EDITABLE",
  "EDIT" = "EDIT",
}
export const CrescoPublicationLayout = (props: {
  publication: CrescoPublication;
  mode: CrescoPublicationLayoutModes;
}) => {
  const [mode, setMode] = useState(props.mode);

  return (
    <div>
      {mode !== CrescoPublicationLayoutModes.EDIT && (
        <CrescoPublicationView publication={props.publication} />
      )}
      {mode === CrescoPublicationLayoutModes.EDIT && (
        <CrescoPublicationInput publication={props.publication} />
      )}

      {mode === CrescoPublicationLayoutModes.EDITABLE && (
        <CrescoButton
          variant={"LINK"}
          onClick={() => setMode(CrescoPublicationLayoutModes.EDIT)}
        >
          Edit
        </CrescoButton>
      )}

      {mode === CrescoPublicationLayoutModes.EDIT && (
        <CrescoButton
          variant={"LINK"}
          onClick={() => setMode(CrescoPublicationLayoutModes.EDITABLE)}
        >
          Cancel edit
        </CrescoButton>
      )}

      <div className={"border-b mt-3"}></div>
    </div>
  );
};
