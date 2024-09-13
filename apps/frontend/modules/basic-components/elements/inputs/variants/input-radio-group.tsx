import { useEffect } from "react";
import { BlockThesis } from "../../../../../components/Hold/blocks/block-thesis";
import { InputOptionSelectable } from "../types/input-option-selectable.type";
import { InputProps } from "../types/input.props";
import { useSetDefaultValue } from "../helpers/use-set-default-value";
import { classList } from "../../../../../utils/classList";

export const InputRadioGroup = (
  props: InputProps & {
    options: InputOptionSelectable[];
  }
) => {
  useSetDefaultValue(props);

  if (props.readonly)
    return (
      <p>
        {props.options.find((opt) => opt.value === props.value)?.text ?? ""}
      </p>
    );
  return (
    <div>
      {props.options.map((opt) => (
        <div key={opt.value} className={"mb-1"}>
          <label className={"flex"}>
            <input
              type={"radio"}
              className={classList("mt-1 mr-2 min-w-[16px]", props.className)}
              checked={opt.value === props.value}
              onChange={(e) =>
                e.target.checked && props.onChangeValue(opt.value)
              }
            />
            <BlockThesis {...opt} />
          </label>
        </div>
      ))}
    </div>
  );
};
