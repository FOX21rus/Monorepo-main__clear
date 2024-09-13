import { useEffect } from "react";
import { InputProps } from "../types/input.props";
import { InputOptionSelectable } from "../types/input-option-selectable.type";
import { useSetDefaultValue } from "../helpers/use-set-default-value";
import { InputCheckbox } from "./input-checkbox";

export const InputCheckboxGroup = (
  props: InputProps & {
    options: InputOptionSelectable[];
  }
) => {
  useSetDefaultValue(props);
  return (
    <div>
      {props.options.map((opt) => (
        <div key={opt.value} className={"mb-2"}>
          <InputCheckbox
            value={props.value?.includes?.(opt.value)}
            thesis={opt}
            onChangeValue={(value) => {
              value &&
                props.onChangeValue(
                  Array.from(new Set(props.value ?? []).add(opt.value))
                );
              !value &&
                props.onChangeValue(
                  props.value
                    ?.map((val: any) => (val === opt.value ? undefined : val))
                    ?.filter(Boolean)
                );
            }}
          />
        </div>
      ))}
    </div>
  );
};
