import { InputProps } from "../types/input.props";
import { useSetDefaultValue } from "../helpers/use-set-default-value";
import { inputTextBoxTw } from "../input-text-box.tw";
import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
registerLocale("ru", ru);
const isDate = function (date: string) {
  try {
    // @ts-ignore
    return new Date(date) !== "Invalid Date" && !isNaN(new Date(date));
  } catch (e) {
    return false;
  }
};
const Input = ({
  onChange,
  placeholder,
  value,
  isSecure,
  id,
  onClick,
  className,
}: any) => (
  <input
    onChange={onChange}
    placeholder={placeholder}
    value={value}
    id={id}
    onClick={onClick}
    className={className}
  />
);

export const InputDate = (props: InputProps) => {
  useSetDefaultValue(props);
  if (props.readonly)
    return (
      <p>
        {isDate(props.value) ? new Date(props.value).toLocaleDateString() : ""}
      </p>
    );
  return (
    <>
      <DatePicker
        type={"date"}
        locale={"ru"}
        selected={isDate(props.value) ? new Date(props.value) : undefined}
        className={props.className || inputTextBoxTw}
        placeholder={props.placeholder}
        customInput={
          <Input
            {...props}
            onChange={(date: Date) =>
              date?.toString && props.onChangeValue(date.toString())
            }
            className={props.className ?? inputTextBoxTw}
          />
        }
        // minLength={props?.minLength}
        // maxLength={props?.maxLength}
        onChange={(date: Date) =>
          date?.toString && props.onChangeValue(date.toString())
        }
      />
      <p className={"text-xs -mt-2.5 ml-1 text-gray-500"}>
        {props.placeholder}
      </p>
    </>
  );
};
