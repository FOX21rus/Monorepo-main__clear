import { InputProps } from "../types/input.props";
import { useSetDefaultValue } from "../helpers/use-set-default-value";
import { inputTextBoxTw } from "../input-text-box.tw";

export const InputTextarea = (props: InputProps) => {
  useSetDefaultValue(props);
  return (
    <textarea
      value={props.value}
      className={props.className ?? inputTextBoxTw}
      placeholder={props.placeholder}
      onChange={(e) => props.onChangeValue(e.target.value)}
    />
  );
};
