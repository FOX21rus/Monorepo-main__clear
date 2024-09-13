import { useEffect } from "react";
import { BlockThesis } from "../../../../../components/Hold/blocks/block-thesis";
import { InputProps } from "../types/input.props";
import { InputOptionSelectable } from "../types/input-option-selectable.type";
import { useSetDefaultValue } from "../helpers/use-set-default-value";

export const InputCheckbox = (
  props: InputProps & { thesis: InputOptionSelectable }
) => {
  useSetDefaultValue(props);
  return (
    <label className={"flex"}>
      <input
        type={"checkbox"}
        className={"mt-1 block min-w-[16px]"}
        checked={props.value}
        onChange={(e) => {
          e.target.checked && props.onChangeValue(true);
          !e.target.checked && props.onChangeValue(false);
        }}
      />
      <BlockThesis {...props.thesis} className={"ml-2"} />
    </label>
  );
};
