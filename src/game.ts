export interface CellInterface {
  x: number;
  y: number;
}

type Matrix = { [coordinates: string]: CellInterface };
type Coordinate = [number, number];

export default function createGame() {
  const matrix: Matrix = {};
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
    return matrix[x + ":" + y];
  }

  function set(x: number, y: number): CellInterface {
    const cell: CellInterface = { x, y };
    matrix[x + ":" + y] = cell;
    return cell;
  }

  function unset(x: number, y: number) {
    delete matrix[x + ":" + y];
  }

  function getAround(x: number, y: number): (CellInterface | undefined)[] {
    return aroundOffset.map(([offsetX, offsetY]) =>
      get(x + offsetX, y + offsetY)
    );
  }

  function getAllCells(): CellInterface[] {
    return Object.keys(matrix).map((key) => {
      return matrix[key];
    });
  }

  function tick(): void {
    const shouldPopAt: Coordinate[] = [];
    const shouldDie = [] as CellInterface[];
    getAllCells().forEach((cell) => {
      const { x, y } = cell;
      const alivesCells = getAround(x, y).filter((c) => !!c);
      const deadCoordinates = aroundOffset
        .map(([offsetX, offsetY]) => [x + offsetX, y + offsetY])
        .filter(([xo, yo]) => !get(xo, yo));

      if (alivesCells.length < 2 || alivesCells.length > 3) {
        shouldDie.push(cell);
      }

      deadCoordinates.forEach(([xd, yd]) => {
        if (getAround(xd, yd).filter((c) => !!c).length === 3) {
          shouldPopAt.push([xd, yd]);
        }
      });
    });

    shouldDie.forEach((cell) => unset(cell.x, cell.y));
    shouldPopAt.forEach(([x, y]: Coordinate) => set(x, y));
  }

  return { tick, get, set, unset, getAround, getAllCells };
}
