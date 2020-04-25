import useGame from "./useGame";

describe("useGame", () => {
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
