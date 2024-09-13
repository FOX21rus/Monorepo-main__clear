import { InputProps } from "../types/input.props";
import { useSetDefaultValue } from "../helpers/use-set-default-value";
import { inputTextBoxTw } from "../input-text-box.tw";

export const InputText = (props: InputProps) => {
  useSetDefaultValue(props);
  if (props.readonly) return <p>{props.value ? props.value : "Not defined"}</p>;
  return (
    <input
      type={"text"}
      value={props.value}
      className={props.className ?? inputTextBoxTw}
      placeholder={props.placeholder}
      onChange={(e) => props.onChangeValue(e.target.value)}
    />
  );
};
