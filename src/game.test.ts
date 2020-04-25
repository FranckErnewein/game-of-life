import { createGame } from "./game";

describe("game", () => {
  describe("basics utils", () => {
    it("should init the game without cell", () => {
      const { get } = createGame();
      expect(get(0, 0)).toBe(undefined);
    });

    it("should fill a cell at 0:1", () => {
      const { get, set } = createGame();
      expect(set(0, 1)).toEqual({ x: 0, y: 1 });
      expect(get(0, 1)).toEqual({ x: 0, y: 1 });
    });

    it("should clear a cell at 0:1", () => {
      const { get, set, unset } = createGame();
      set(0, 1);
      expect(get(0, 1)).toEqual({ x: 0, y: 1 });
      unset(0, 1);
      expect(get(0, 1)).toEqual(undefined);
    });

    it("should return all cells collections", () => {
      const { set, getAllCells } = createGame();
      expect(getAllCells().length).toEqual(0);
      set(0, 1);
      expect(getAllCells().length).toEqual(1);
      set(1, 1);
      expect(getAllCells().length).toEqual(2);
    });
  });

  describe("rules", () => {
    it("should die because cell is alone", () => {
      const { get, set, tick } = createGame();
      set(0, 0);
      tick();
      expect(get(0, 0)).toEqual(undefined);
    });

    it("should die because only one cell around", () => {
      const { get, set, tick } = createGame();
      set(0, 0);
      set(0, 1);
      tick();
      expect(get(0, 0)).toEqual(undefined);
      expect(get(0, 1)).toEqual(undefined);
    });

    it("3 cells should create a new one", () => {
      const { get, set, tick } = createGame();
      set(0, 0);
      set(0, 1);
      set(1, 0);
      tick();
      expect(get(1, 1)).toEqual({ x: 1, y: 1 });
    });

    it("should stay in stable state (square 2x2)", () => {
      const { set, tick, getAllCells } = createGame();
      set(0, 0);
      set(0, 1);
      set(1, 0);
      set(1, 1);
      tick();
      expect(getAllCells().length).toBe(4);
      tick();
      expect(getAllCells().length).toBe(4);
    });
  });
});
