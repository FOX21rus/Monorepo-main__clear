import { InputProps } from "../types/input.props";
import { useSetDefaultValue } from "../helpers/use-set-default-value";
import { inputTextBoxTw } from "../input-text-box.tw";
import NumberFormat from "react-number-format";
export const InputNumberRub = (props: InputProps & { suffix?: string }) => {
  useSetDefaultValue(props);
  return (
    <NumberFormat
      thousandSeparator={" "}
      allowNegative={false}
      value={props.value}
      suffix={props.suffix ?? " ₽"}
      className={inputTextBoxTw}
      onValueChange={props.onChangeValue}
    />
  );
};
