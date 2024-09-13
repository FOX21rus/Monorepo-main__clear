import { fieldsets } from "../../data/fieldsets/fieldsets";
import { FieldTypeEnum } from "../../data/graphql/sdk/graphql";
// type Field = typeof fieldsets.fieldsetEduProductEvent[0];

export const FieldsetView = ({
  object,
}: // fieldset,
{
  object?: any;
  // fieldset: typeof fieldsets.fieldsetEduProductEvent;
}) => {
  return (
    <div className={"grid gap-5"}>
      {/*{fieldset?.map((fld) => (*/}
      {/*  <FieldWithDescriptors*/}
      {/*    key={fld.name}*/}
      {/*    field={fld}*/}
      {/*    value={object?.[fld.name]}*/}
      {/*  />*/}
      {/*))}*/}
    </div>
  );
};

const FieldWithDescriptors = ({
  value,
  field,
}: {
  value: any;
  field?: any;
}) => {
  return (
    <div>
      <p>{field.title}</p>
      <p className={"text-xs"}>{field.description}</p>
      <div>
        <FieldView field={field} value={value} />
      </div>
    </div>
  );
};

const FieldView = ({ field, value }: { field?: any; value: any }) => {
  const fieldType = field.fieldType as FieldTypeEnum;

  if (field.childrenFieldset?.name)
    return (
      <FieldsetView
        // fieldset={fieldsets[field.childrenFieldset?.name]}
        object={value}
      />
    );

  return <p>{value}</p>;
};
