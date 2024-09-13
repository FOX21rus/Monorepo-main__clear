import { useFieldset } from "../../../../modules/fieldset/useFieldset";
import { CrescoPublication } from "../../../../data/graphql/sdk/graphql";
import { fieldsets } from "../../../../data/fieldsets/fieldsets";
import { sdk } from "../../../../data/graphql/sdk";
import { CrescoButton } from "../../blocks/buttons/cresco-button";

export const CrescoPublicationInput = (props: {
  publication?: CrescoPublication;
  afterSave?: any;
}) => {
  const {
    Fieldset: FieldsetPublication,
    fieldsetController: publicationController,
    debugFieldsetProps,
  } = useFieldset<CrescoPublication>({
    allFieldsets: fieldsets,
    fieldsetKey: "fieldsetCrescoPublication",
    initialValues: props.publication,
    sdkUpsertMutation: (publicationDto: any) =>
      sdk().crescoAdminUpsertPublication({
        input: { ...publicationDto, id: props?.publication?.id },
      }),
    roles: ["admin"],
    preferEdit: true,
    afterSave: props.afterSave,
  });

  return (
    <div>
      <FieldsetPublication />
      <div className={"mt-5"}>
        {!publicationController.blinkSaveSuccess && (
          <CrescoButton
            variant={"BASIC"}
            onClick={publicationController.onSave}
          >
            Save
          </CrescoButton>
        )}
        {publicationController.blinkSaveSuccess && (
          <p className={"text-cresco-green-600"}>Successfully saved</p>
        )}
      </div>
    </div>
  );
};
