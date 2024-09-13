import { sdk } from "../../../../data/graphql/sdk";
import {
  CrescoPublicationLayout,
  CrescoPublicationLayoutModes,
} from "./cresco-publication.layout";
import { CrescoPublicationInput } from "./cresco-publication.input";
import { useState } from "react";
import { CrescoButton } from "../../blocks/buttons/cresco-button";

export const CrescoPublicationsFeed = ({
  canAddNew,
}: {
  canAddNew?: boolean;
}) => {
  const { data, mutate } = sdk().useCrescoCustomerListPublications();
  const publications = data?.crescoCustomerListPublications ?? [];
  const [addNew, setAddNew] = useState(false);
  return (
    <div>
      {addNew && (
        <CrescoPublicationInput
          afterSave={() => {
            mutate();
            setAddNew(false);
          }}
        />
      )}
      {canAddNew && !addNew && (
        <CrescoButton variant={"BASIC"} onClick={() => setAddNew(true)}>
          Add publication
        </CrescoButton>
      )}
      {publications.map((p) => (
        <div className={"my-10"} key={p.id}>
          <CrescoPublicationLayout
            publication={p}
            mode={
              canAddNew
                ? CrescoPublicationLayoutModes.EDITABLE
                : CrescoPublicationLayoutModes.VIEW
            }
          />
        </div>
      ))}
    </div>
  );
};
