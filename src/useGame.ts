export interface CellInterface {
  x: number;
  y: number;
}

type Column = (CellInterface | undefined)[];

export default function useGame() {
  const matrix: Column[] = [];

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

  function tick(): void {}

  return { tick, get, set, unset };
}
