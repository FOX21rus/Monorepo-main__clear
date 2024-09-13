export interface PropsElementRouter {
  elementKind: string; //not to interfer with classic input types
  value: any;
  onChangeValue: (value: any) => void;
}
