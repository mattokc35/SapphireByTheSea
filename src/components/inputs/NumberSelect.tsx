import React, { FC } from "react";
import Select, { SingleValue } from "react-select";
import "./NumberSelectStyles.css";
import { adultOptions } from "@/constants/constants";

interface OptionType {
  value: number;
  label: string;
}

interface NumberSelectProps {
  label: string;
  options?: OptionType[];
  onChange: (selectedOption: number) => void;
  id?: string;
  className?: string;
  value: number; // Changed to number
}

const NumberSelect: FC<NumberSelectProps> = (props) => {
  const handleSelectChange = (
    selectedOption: SingleValue<OptionType> | null
  ) => {
    if (selectedOption) {
      props.onChange(selectedOption.value);
    } else {
      props.onChange(0);
    }
  };

  return (
    <div className="number-select-form">
      <h4 className="number-select-label">{props.label}</h4>
      <div className="number-select-component">
        <Select
          options={props.options || adultOptions}
          onChange={handleSelectChange}
          isClearable={true}
          value={
            props.options?.find((option) => option.value === props.value) ||
            null
          }
        />
      </div>
    </div>
  );
};

export default NumberSelect;
