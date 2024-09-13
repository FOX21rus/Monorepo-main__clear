import PhoneInput from "react-phone-number-input/input";
import { InputProps } from "../types/input.props";
import { useEffect } from "react";
import { inputTextBoxTw } from "../input-text-box.tw";

export const InputPhone = ({
  value,
  defaultValue,
  onChangeValue,
}: InputProps) => {
  useEffect(() => {
    if (value?.match("\\+9")) {
      onChangeValue(value.replace("+9", "+79"));
    }
    if (value?.match("\\+8")) {
      onChangeValue(value.replace("+8", "+7"));
    }
  }, [value]);
  return (
    <PhoneInput
      value={value}
      onChange={onChangeValue}
      placeholder={"Phone number"}
      className={
        "shadow-sm focus:ring-cresco-violet focus:border-ring-cresco-violet block w-full sm:text-sm border-gray-300 rounded-md"
      }
      // inputComponent={(props:any)=><input
      //     {...props}
      //     className={props.className ?? inputTextBoxTw}
      //     type={"text"}
      //
      // />}
    />
  );
};
