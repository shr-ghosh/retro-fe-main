import React from "react";
import Input, { InputProps } from "./Input";
import Dropdown, { BasicDropdownProps } from "./Dropdown";

interface Props extends InputProps, BasicDropdownProps {}

const InputOptions = ({
  options,
  onOptionSelect,
  defaultSelectedOption,
  ...restInputProps
}: Props) => {
  return (
      <Input {...restInputProps}>
        <Dropdown
          options={options}
          defaultSelectedOption={defaultSelectedOption}
          onOptionSelect={onOptionSelect}
          dropdownSize="small"
        />
      </Input>
  );
};

export default InputOptions;
