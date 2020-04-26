import React, { FunctionComponent, ChangeEvent } from "react";
import styled from "styled-components";

const Content = styled.div`
  display: flex;
  color: #777;
  font-size: 11px;
  text-transform: uppercase;
  padding: 10px 0 5px 0;
  label,
  div {
    display: block;
    line-height: 15px;
    height: 15px;
    width: 45px;
  }
  div {
    text-align: right;
  }
  span {
    display: inline-block;
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
    <Content>
      <label>{label}:</label>
      <input
        title={label}
        name={label.toLowerCase()}
        defaultValue={value}
        min={min}
        type="range"
        max={max}
        onChange={onInputChange}
      />
      <div>
        {value}/{max}
      </div>
    </Content>
  );
};

export default InputRange;
