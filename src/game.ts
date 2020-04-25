interface CellInterface {
  x: number;
  y: number;
}

type Column = (CellInterface | undefined)[];
type Matrix = Column[];
type Coordinate = [number, number];

export function createGame() {
  const matrix: Matrix = [];
  const aroundOffset: Coordinate[] = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

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

  function getAround(x: number, y: number): (CellInterface | undefined)[] {
    return aroundOffset.map(([offsetX, offsetY]) =>
      get(x + offsetX, y + offsetY)
    );
  }

  function getAllCells(): CellInterface[] {
    const all: CellInterface[] = [];
    matrix.forEach((column: Column) => {
      if (column) {
        column.forEach((cell) => {
          if (cell) all.push(cell);
        });
      }
    });
    return all;
  }

  function tick(): void {
    const shouldPopAt: Coordinate[] = [];
    const shouldDie = [] as CellInterface[];
    matrix.forEach((column, x) => {
      if (column) {
        column.forEach((cell, y) => {
          if (cell) {
            const alivesCells = getAround(x, y).filter((c) => !!c);
            const deadCoordinates = aroundOffset.filter(
              ([offsetX, offsetY]) => !get(x + offsetX, y + offsetY)
            );

            if (alivesCells.length < 2 || alivesCells.length > 3) {
              shouldDie.push(cell);
            }

            deadCoordinates.forEach(([xd, yd]) => {
              if (getAround(xd, yd).filter((c) => !!c).length === 3) {
                shouldPopAt.push([xd, yd]);
              }
            });
          }
        });
      }
    });

    shouldDie.forEach((cell) => unset(cell.x, cell.y));
    shouldPopAt.forEach(([x, y]: Coordinate) => set(x, y));
  }

  return { tick, get, set, unset, getAround, getAllCells };
}
