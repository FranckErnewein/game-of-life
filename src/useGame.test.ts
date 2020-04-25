import useGame from "./useGame";

describe("useGame", () => {
  describe("basics utils", () => {
    it("should init the game without cell", () => {
      const { get } = useGame();
      expect(get(0, 0)).toBe(undefined);
    });

    it("should fill a cell at 0:1", () => {
      const { get, set } = useGame();
      expect(set(0, 1)).toEqual({ x: 0, y: 1 });
      expect(get(0, 1)).toEqual({ x: 0, y: 1 });
    });

    it("should clear a cell at 0:1", () => {
      const { get, set, unset } = useGame();
      set(0, 1);
      expect(get(0, 1)).toEqual({ x: 0, y: 1 });
      unset(0, 1);
      expect(get(0, 1)).toEqual(undefined);
    });
  });

  describe("utils", () => {
    it("should get nothing because game is empty", () => {
      const { getAround } = useGame();
      expect(getAround(0, 0)).toEqual([]);
    });

    it("should get all cell around", () => {
      const { getAround, set } = useGame();
      set(0, 0);
      set(-1, -1);
      set(-1, 0);
      set(-1, 1);
      set(0, -1);
      set(0, 1);
      set(1, -1);
      set(1, 0);
      set(1, 1);
      expect(getAround(0, 0).length).toEqual(8);
    });

    it("should get no cell because it is too far", () => {
      const { getAround, set } = useGame();
      set(0, 0);
      set(0, 2);
      expect(getAround(0, 0)).toEqual([]);
    });
  });

  describe("rules", () => {
    it("should die because cell is alone", () => {
      const { get, set, tick } = useGame();
      set(0, 0);
      tick();
      expect(get(0, 0)).toEqual(undefined);
    });
  });
});
