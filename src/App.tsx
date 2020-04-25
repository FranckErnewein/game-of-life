import React, { useState, MouseEvent } from "react";
import createGame, { CellInterface } from "./game";
import PlayGround from "./components/PlayGround";

const game = createGame();

function App() {
  const [cells, setCells] = useState<CellInterface[]>(game.getAllCells());

  const onClick = (x: number, y: number) => {
    game.set(x, y);
    setCells(game.getAllCells());
  };

  const onNext = (e: MouseEvent<HTMLButtonElement>) => {
    game.tick();
    setCells(game.getAllCells());
  };

  return (
    <div>
      <button>Play</button>
      <button>Pause</button>
      <button onClick={onNext}>next</button>
      <PlayGround
        width={10}
        height={10}
        cellSize={25}
        onCellClick={onClick}
        cells={cells}
      />
    </div>
  );
}

export default App;
