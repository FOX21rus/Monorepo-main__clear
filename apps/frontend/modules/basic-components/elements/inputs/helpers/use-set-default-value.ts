import { useEffect } from "react";

export const useSetDefaultValue = ({
  defaultValue,
  onChangeValue,
}: {
  defaultValue?: any;
  onChangeValue: (key: any) => void;
}) => {
  useEffect(() => {
    if (defaultValue !== undefined) onChangeValue(defaultValue);
  }, [defaultValue]);
};
