import React, { useState, useEffect, MouseEvent } from "react";
import createGame, { CellInterface } from "./game";
import PlayGround from "./components/PlayGround";

const game = createGame();

function App() {
  const [cells, setCells] = useState<CellInterface[]>(game.getAllCells());
  const [play, setPlay] = useState<boolean>(false);

  const onClick = (x: number, y: number) => {
    game.set(x, y);
    setCells(game.getAllCells());
  };

  const onNext = (e: MouseEvent<HTMLButtonElement>) => {
    game.tick();
    setCells(game.getAllCells());
  };

  const onPlay = (e: MouseEvent<HTMLButtonElement>) => {
    setPlay(true);
  };
  const onPlause = (e: MouseEvent<HTMLButtonElement>) => {
    setPlay(false);
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
    }, 1000 / 24);
    return () => clearInterval(interval);
  });

  return (
    <div>
      <button onClick={onPlay} disabled={play}>
        Play
      </button>
      <button onClick={onPlause} disabled={!play}>
        Pause
      </button>
      <button onClick={onNext}>next</button>
      <PlayGround
        width={100}
        height={100}
        cellSize={5}
        onCellClick={onClick}
        cells={cells}
      />
    </div>
  );
}

export default App;
