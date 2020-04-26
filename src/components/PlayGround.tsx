import React, {
  useState,
  FunctionComponent,
  MouseEvent,
  TouchEvent,
} from "react";
import styled from "styled-components";
import { CellInterface } from "../game";

interface Props {
  cellSize: number;
  cells: CellInterface[];
  onCell: (x: number, y: number) => void;
}

const Container = styled.div`
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #eee;
`;

const Helper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -50px -300px;
  text-align: center;
  width: 600px;
  height: 100px;
  opacity: 0.1;
  text-transform: uppercase;
  pointer-events: none;
  color: #000;
  h1,
  h2,
  p {
    font-family: sans-serif;
    font-weight: normal;
    margin: 0;
    padding: 0;
  }
  h1 {
    font-size: 30px;
    line-height: 30px;
  }
  h2 {
    font-size: 60px;
    line-height: 70px;
  }
  p {
    font-size: 30px;
    line-height: 30px;
  }
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
  const onMouseMoveEvent = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const x = Math.floor(e.nativeEvent.offsetX / cellSize);
    const y = Math.floor(e.nativeEvent.offsetY / cellSize);
    if (isCaputring && (x !== lastX || y !== lastY)) {
      onCell(x, y);
      setLastX(x);
      setLastY(y);
    }
    return false;
  };

  const onMouseStartEvent = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    allowCapture(true);
    const x = Math.floor(e.nativeEvent.offsetX / cellSize);
    const y = Math.floor(e.nativeEvent.offsetY / cellSize);
    onCell(x, y);
    setLastX(x);
    setLastY(y);
    onMouseMoveEvent(e);
    return false;
  };

  const onTouchMoveEvent = (e: TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { touches } = e;
    if (touches && touches[0]) {
      const x = Math.floor(touches[0].clientX / cellSize);
      const y = Math.floor(touches[0].clientY / cellSize);
      if (isCaputring && (x !== lastX || y !== lastY)) {
        onCell(x, y);
        setLastX(x);
        setLastY(y);
      }
    }
    return false;
  };

  const onTouchStartEvent = (e: TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    allowCapture(true);
    const { touches } = e;
    if (touches && touches[0]) {
      const x = Math.floor(touches[0].clientX / cellSize);
      const y = Math.floor(touches[0].clientY / cellSize);
      onCell(x, y);
      setLastX(x);
      setLastY(y);
      onTouchMoveEvent(e);
    }
    return false;
  };

  const stopCapture = () => allowCapture(false);
  return (
    <Container
      onMouseDown={onMouseStartEvent}
      onMouseMove={onMouseMoveEvent}
      onMouseLeave={stopCapture}
      onMouseUp={stopCapture}
      onTouchStart={onTouchStartEvent}
      onTouchMove={onTouchMoveEvent}
      onTouchCancel={stopCapture}
      onTouchEnd={stopCapture}
    >
      {cells.length === 0 && (
        <Helper>
          <h1>The game of life</h1>
          <h2>Draw here</h2>
          <p>then play</p>
        </Helper>
      )}
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
