import React, { useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import createGame, { CellInterface } from "./game";
import PlayGround from "./components/PlayGround";
import Infos from "./components/panel/Infos";
import About from "./components/panel/About";
import Title from "./components/panel/Title";
import Section from "./components/panel/Section";

const spacing = 10;
const panelHeight = 150;

const Panel = styled.section`
  position: fixed;
  z-index: 10;
  width: 100%;
  box-sizing: border-box;
  bottom: 0;
  left: 0;
  font-family: monospace;
`;

const Controls = styled.nav`
  padding: ${spacing}px;
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const TogglerHandler = styled.div`
  position: absolute;
  right: ${spacing}px;
  bottom: ${spacing}px;
`;

const Toggler = styled.div<{ open?: boolean }>`
  background: #fff;
  height: ${(p) => (p.open ? panelHeight : 0)}px;
  overflow: hidden;
  transition: height 250ms;
`;

const More = styled.nav`
  padding: ${spacing}px;
  margin: ${spacing}px 0;
  height: ${panelHeight - spacing * 2}px;
  background: #fff;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  border: 1px solid #ccc;
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
  const [fps, setFPS] = useState<number>(8);
  const [size, setSize] = useState<number>(5);
  const [play, setPlay] = useState<boolean>(false);
  const [panelOpened, openPanel] = useState<boolean>(false);

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
  const onSize = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      console.log(e.target.value);
      setSize(parseInt(e.target.value, 10));
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
      <Panel>
        <Controls>
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
        </Controls>
        <Toggler open={panelOpened}>
          <More>
            <Section>
              <Title>Settings</Title>
              <input
                title="speed"
                name="fps"
                defaultValue={fps}
                min={1}
                type="range"
                max={30}
                onChange={onSlide}
              />
              <input
                title="size"
                name="size"
                defaultValue={size}
                min={1}
                type="range"
                max={10}
                onChange={onSize}
              />
            </Section>
            <Infos />
            <About />
          </More>
        </Toggler>
        <TogglerHandler>
          <Button onClick={() => openPanel(!panelOpened)}>
            {panelOpened ? "-" : "?"}
          </Button>
        </TogglerHandler>
      </Panel>
      <PlayGround cellSize={size} onCell={toggleCell} cells={cells} />
    </div>
  );
}

export default App;
