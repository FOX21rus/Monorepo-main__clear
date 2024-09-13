import { fieldsets } from "../../../../../data/fieldsets/fieldsets";
import { Fieldset } from "../../../../../modules/fieldset/fieldset";
import {
  CrescoCustomer,
  CrescoCustomerCustomerInput,
} from "../../../../../data/graphql/sdk/graphql";
import { sdk } from "../../../../../data/graphql/sdk";
import { CrescoButton } from "../../../../cresco/blocks/buttons/cresco-button";
import { useFieldset } from "../../../../../modules/fieldset/useFieldset";

export const CrescoCustomerView = ({
  roles,
  customer,
}: {
  roles: string[];
  customer: CrescoCustomer;
}) => {
  return <div>{/*<FieldsetCustomer />*/}</div>;
};
