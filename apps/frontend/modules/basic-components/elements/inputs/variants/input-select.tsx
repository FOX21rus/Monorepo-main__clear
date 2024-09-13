import { InputProps } from "../types/input.props";
import { useSetDefaultValue } from "../helpers/use-set-default-value";
import { inputTextBoxTw } from "../input-text-box.tw";
import { InputOptionSelectable } from "../types/input-option-selectable.type";

export const InputSelect = (
  props: InputProps & { options: InputOptionSelectable[] }
) => {
  useSetDefaultValue(props);
  const isEmptysh = (val: any) => {
    return val === undefined || val === "";
  };
  return (
    <select
      className={inputTextBoxTw}
      value={props.value}
      onChange={(e) => props.onChangeValue(e.target.value)}
    >
      {props.options.map((opt) => (
        <option
          key={opt.value}
          value={opt.value}
          disabled={isEmptysh(opt.value)}
          selected={!props.defaultValue && isEmptysh(opt.value)}
          hidden={isEmptysh(opt.value)}
        >
          {opt.text}
        </option>
      ))}
    </select>
  );
};
