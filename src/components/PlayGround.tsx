import React, { useState, FunctionComponent, MouseEvent } from "react";
import styled from "styled-components";
import { CellInterface } from "../game";

interface Props {
  cellSize: number;
  cells: CellInterface[];
  onCell: (x: number, y: number) => void;
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #eee;
`;

const Cell = styled.div`
  position: absolute;
  pointer-events: none;
  background: black;
`;

const PlayGround: FunctionComponent<Props> = ({ cellSize, cells, onCell }) => {
  const [isCaputring, allowCapture] = useState<boolean>(false);
  const [lastX, setLastX] = useState<number>(0);
  const [lastY, setLastY] = useState<number>(0);
  const onMouseEvent = (e: MouseEvent<HTMLDivElement>) => {
    const x = Math.floor(e.nativeEvent.offsetX / cellSize);
    const y = Math.floor(e.nativeEvent.offsetY / cellSize);
    if (isCaputring && (x !== lastX || y !== lastY)) {
      onCell(x, y);
      setLastX(x);
      setLastY(y);
    }
  };
  return (
    <Container
      onMouseMove={onMouseEvent}
      onMouseDown={(e) => {
        allowCapture(true);
        const x = Math.floor(e.nativeEvent.offsetX / cellSize);
        const y = Math.floor(e.nativeEvent.offsetY / cellSize);
        onCell(x, y);
        setLastX(x);
        setLastY(y);
        onMouseEvent(e);
      }}
      onMouseLeave={() => allowCapture(false)}
      onMouseUp={() => allowCapture(false)}
    >
      {cells.map((cell) => {
        return (
          <Cell
            key={`${cell.x}:${cell.y}`}
            style={{
              top: cell.y * cellSize,
              left: cell.x * cellSize,
              width: cellSize,
              height: cellSize,
            }}
          />
        );
      })}
    </Container>
  );
};

export default PlayGround;
