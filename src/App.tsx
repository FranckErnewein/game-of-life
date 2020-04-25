import React, { useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import createGame, { CellInterface } from "./game";
import PlayGround from "./components/PlayGround";

const Controls = styled.nav`
  position: fixed;
  z-index: 10;
  width: 98%;
  bottom: 0;
  left: 0;
  background: #fff;
  font-family: monospace;
  padding: 1%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

const Button = styled.button`
  border: 1px solid #eee;
  background: #fff;
  font-family: monospace;
  margin: 2px;
  padding: 10px 16px;
  cursor: pointer;
  outline: 0 none;
  font-size: 14px;
  &:hover {
    border-color: #ccc;
  }
`;

const game = createGame();

function App() {
  const [cells, setCells] = useState<CellInterface[]>(game.getAllCells());
  const [fps, setFPS] = useState<number>(18);
  const [play, setPlay] = useState<boolean>(false);

  const toggleCell = (x: number, y: number) => {
    const c = game.get(x, y);
    if (c) game.unset(x, y);
    else game.set(x, y);
    setCells(game.getAllCells());
  };

  const onNext = () => {
    game.tick();
    setCells(game.getAllCells());
  };

  const onPlay = () => {
    setPlay(true);
  };
  const onPlause = () => {
    setPlay(false);
  };
  const onClear = () => {
    game.getAllCells().forEach((cell) => game.unset(cell.x, cell.y));
    setCells(game.getAllCells());
  };

  const onSlide = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      setFPS(parseInt(e.target.value, 10));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (play) {
        game.tick();
        const c = game.getAllCells();
        setCells(c);
        if (c.length === 0) {
          setPlay(false);
        }
      }
    }, 1000 / fps);
    return () => clearInterval(interval);
  }, [fps, play]);

  return (
    <div>
      <Controls>
        <label htmlFor="fps">
          speed
          <input
            name="fps"
            defaultValue={fps}
            min={1}
            type="range"
            max={30}
            onChange={onSlide}
          />
        </label>
        <Button onClick={onPlay} disabled={play}>
          play
        </Button>
        <Button onClick={onPlause} disabled={!play}>
          pause
        </Button>
        <Button onClick={onNext} disabled={play}>
          next
        </Button>
        <Button onClick={onClear} disabled={play}>
          clear
        </Button>
        <a
          target="_blank"
          href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
        >
          info
        </a>
      </Controls>
      <PlayGround cellSize={5} onCell={toggleCell} cells={cells} />
    </div>
  );
}

export default App;
