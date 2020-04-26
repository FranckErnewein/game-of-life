import React, { useState, useEffect } from "react";
import styled from "styled-components";
import createGame, { CellInterface } from "./game";
import PlayGround from "./components/PlayGround";
import InputRange from "./components/InputRange";
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
  transition: height 150ms;
  border-top: 1px solid #ddd;
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
  const [fps, setFPS] = useState<number>(12);
  const [size, setSize] = useState<number>(5);
  const [isPlaying, setPlay] = useState<boolean>(false);
  const [panelOpened, openPanel] = useState<boolean>(false);

  const toggleCell = (x: number, y: number) => {
    const c = game.get(x, y);
    if (c) game.unset(x, y);
    else game.set(x, y);
    setCells(game.getAllCells());
  };

  const next = () => {
    game.tick();
    setCells(game.getAllCells());
  };

  const play = () => setPlay(true);
  const pause = () => setPlay(false);
  const clear = () => {
    game.getAllCells().forEach((cell) => game.unset(cell.x, cell.y));
    setCells(game.getAllCells());
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        game.tick();
        const c = game.getAllCells();
        setCells(c);
        if (c.length === 0) {
          setPlay(false);
        }
      }
    }, 1000 / fps);
    return () => clearInterval(interval);
  }, [fps, isPlaying]);

  return (
    <div>
      <Panel>
        <Controls>
          <Button onClick={play} disabled={isPlaying}>
            play
          </Button>
          <Button onClick={pause} disabled={!isPlaying}>
            pause
          </Button>
          <Button onClick={next} disabled={isPlaying}>
            next
          </Button>
          <Button onClick={clear} disabled={isPlaying}>
            clear
          </Button>
        </Controls>
        <Toggler open={panelOpened}>
          <More>
            <Section>
              <Title>Settings</Title>
              <InputRange
                label="Speed"
                value={fps}
                onChange={setFPS}
                min={1}
                max={30}
              />
              <InputRange
                label="Zoom"
                value={size}
                onChange={setSize}
                min={1}
                max={10}
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
