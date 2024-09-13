export interface Field {
  name: string;
  isRequired: boolean;
  title: string;
  description?: string;
  fieldType: string;
  aclArgs?: { read: string[]; write: string[] };
  childrenFieldset: { name: string; isList?: boolean };
}
export type FieldsetType = Field[];
