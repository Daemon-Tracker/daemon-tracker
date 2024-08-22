import React, { useState } from "react";

interface DropdownProps {
  options: { value: string }[];
  onChange: (value: string) => void;
  selectedValue: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onChange,
  selectedValue,
}) => {
  return (
    <select
      value={selectedValue}
      onChange={(e) => onChange(e.target.value)}
      className="form-select -translate-x-[0.5px] bg-transparent text-sm text-white"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} className="text-black">
          {option.value}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
