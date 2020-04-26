import React, { FunctionComponent, ChangeEvent } from "react";
import styled from "styled-components";

const Label = styled.label`
  display: flex;
  color: #777;
  font-size: 11px;
  text-transform: uppercase;
  padding: 10px 0 5px 0;
  span {
    display: inline-block;
    width: 45px;
  }
`;

interface Props {
  label: string;
  onChange: (value: number) => void;
  min: number;
  max: number;
  value: number;
}

const InputRange: FunctionComponent<Props> = ({
  label,
  onChange,
  min,
  max,
  value,
}) => {
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      onChange(parseInt(e.target.value, 10));
    }
  };
  return (
    <Label>
      <span>{label}:</span>
      <input
        title={label}
        name={label.toLowerCase()}
        defaultValue={value}
        min={min}
        type="range"
        max={max}
        onChange={onInputChange}
      />
      {value}/{max}
    </Label>
  );
};

export default InputRange;
