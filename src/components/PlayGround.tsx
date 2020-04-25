import React, { FunctionComponent, MouseEvent } from "react";
import styled from "styled-components";
import { CellInterface } from "../game";

interface Props {
  width: number;
  height: number;
  cellSize: number;
  cells: CellInterface[];
  onCellClick: (x: number, y: number) => void;
}
const color = "#ccc";

const Container = styled.div`
  position: relative;
  border: 1px solid ${color};
`;

const Cell = styled.div`
  position: absolute;
  background: black;
`;

const PlayGround: FunctionComponent<Props> = ({
  width,
  height,
  cellSize,
  cells,
  onCellClick,
}) => {
  return (
    <Container
      onClick={(e: MouseEvent<HTMLDivElement>) => {
        onCellClick(
          Math.floor(e.nativeEvent.offsetX / cellSize),
          Math.floor(e.nativeEvent.offsetY / cellSize)
        );
      }}
      style={{
        width: width * cellSize,
        height: height * cellSize,
      }}
    >
      {cells.map((cell) => {
        return (
          <Cell
            key={`${cell.x}-${cell.y}`}
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
