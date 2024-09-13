export interface InputProps {
  value: any;
  onChangeValue: (value: any) => void;
  defaultValue?: any;
  placeholder?: string;
  className?: string;
  readonly?: boolean;
}
