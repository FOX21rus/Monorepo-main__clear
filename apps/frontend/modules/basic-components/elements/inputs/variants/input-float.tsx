import { InputProps } from "../types/input.props";
import { useSetDefaultValue } from "../helpers/use-set-default-value";
import { inputTextBoxTw } from "../input-text-box.tw";

export const InputFloat = (props: InputProps & {allowNegative?:boolean}) => {
  useSetDefaultValue(props);
  if (props.readonly) return <p>{props.value}</p>;
  return (
    <input
      type={"number"}
      step={0.01}
      min={props.allowNegative?undefined:0}
      value={props.value}
      className={props.className ?? inputTextBoxTw}
      placeholder={props.placeholder}
      onChange={(e) => {
        // console.log(e.target.value)
        props.onChangeValue(parseFloat(e.target.value))
      }}
    />
  );
};
