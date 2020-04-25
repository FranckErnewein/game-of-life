export interface CellInterface {
  x: number;
  y: number;
}

type Column = (CellInterface | undefined)[];
type Matrix = Column[];

export default function useGame() {
  const matrix: Matrix = [];

  function get(x: number, y: number): CellInterface | undefined {
    if (!matrix[x]) {
      return undefined;
    }
    return matrix[x][y];
  }

  function set(x: number, y: number): CellInterface {
    const cell: CellInterface = { x, y };
    if (!matrix[x]) {
      matrix[x] = [];
    }
    matrix[x][y] = cell;
    return cell;
  }

  function unset(x: number, y: number) {
    if (matrix[x] && matrix[x][y]) {
      matrix[x][y] = undefined;
    }
  }

  function getAround(x: number, y: number): CellInterface[] {
    return [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ].reduce((memo, [offsetX, offsetY]) => {
      const cell = get(x + offsetX, y + offsetY);
      if (cell) {
        memo.push(cell);
      }
      return memo;
    }, [] as CellInterface[]);
  }

  function tick(): void {
    matrix.forEach((column, y) => {
      if (column) {
        column.forEach((cell, x) => {
          if (cell) {
            const arounds = getAround(x, y);
            if (arounds.length < 2 || arounds.length > 3) {
              unset(x, y);
            }
          }
        });
      }
    });
  }

  return { tick, get, set, unset, getAround };
}
