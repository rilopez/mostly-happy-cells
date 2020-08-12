import { newCellFrom, collectNeighbors, animateNextFrame, toEmojiTextGrid, parseGridStateFromEmoji } from './engine'
import { CellState, GridState, createGridState } from './types/GameState';

test('cellular automata rules', () => {
    // Any dead cell with exactly three sad neighbors becomes a sad cell.
    expect(newCellFrom(CellState.DEAD, { sad: 3, happy: 0, dead: 0 })).toBe(CellState.SAD)
    // Any dead cell with exactly two sad neighbors and 1 happy neighbor becomes a sad cell.
    expect(newCellFrom(CellState.DEAD, { sad: 2, happy: 1, dead: 0 })).toBe(CellState.SAD)
    // Any dead cell with exactly one sad neighbor and 2 happy neighbors becomes a happy cell.
    expect(newCellFrom(CellState.DEAD, { sad: 1, happy: 2, dead: 0 })).toBe(CellState.HAPPY)
    // Any dead cell with exactly 3 happy neighbors becomes a happy cell.
    expect(newCellFrom(CellState.DEAD, { happy: 3, sad: 0, dead: 0 })).toBe(CellState.HAPPY)

    // Any sad or happy cell with a combined total of exactly two or three sad or happy neighbours survives.
    expect(newCellFrom(CellState.SAD, { sad: 2, dead: 0, happy: 0 })).toBe(CellState.SAD)
    expect(newCellFrom(CellState.SAD, { sad: 3, dead: 0, happy: 0 })).toBe(CellState.SAD)
    expect(newCellFrom(CellState.SAD, { happy: 2, dead: 0, sad: 0 })).toBe(CellState.SAD)
    expect(newCellFrom(CellState.SAD, { happy: 3, dead: 0, sad: 0 })).toBe(CellState.SAD)
    expect(newCellFrom(CellState.HAPPY, { sad: 2, dead: 0, happy: 0 })).toBe(CellState.HAPPY)
    expect(newCellFrom(CellState.HAPPY, { sad: 3, dead: 0, happy: 0 })).toBe(CellState.HAPPY)
    expect(newCellFrom(CellState.HAPPY, { happy: 2, dead: 0, sad: 0 })).toBe(CellState.HAPPY)
    expect(newCellFrom(CellState.HAPPY, { happy: 3, dead: 0, sad: 0 })).toBe(CellState.HAPPY)
});


test('collectNeighbors', () => {
    let state: GridState = createGridState(4, 4)
    expect(collectNeighbors(state, 1, 1)).toEqual({ dead: 8, sad: 0, happy: 0 });

    state[0][0] = CellState.SAD;
    state[0][1] = CellState.HAPPY;
    state[1][1] = CellState.SAD;
    state[2][2] = CellState.SAD;
    state[3][3] = CellState.SAD;


    expect(collectNeighbors(state, 1, 1)).toEqual({ dead: 5, sad: 2, happy: 1 });
    expect(collectNeighbors(state, 2, 2)).toEqual({ dead: 6, sad: 2, happy: 0 });

});




test('collectNeighbors', () => {
    let state: GridState = createGridState(4, 4)
    expect(collectNeighbors(state, 1, 1)).toEqual({ dead: 8, sad: 0, happy: 0 });

    state[0][0] = CellState.SAD;
    state[0][1] = CellState.HAPPY;
    state[1][1] = CellState.SAD;
    state[2][2] = CellState.SAD;
    state[3][3] = CellState.SAD;


    expect(collectNeighbors(state, 1, 1)).toEqual({ dead: 5, sad: 2, happy: 1 });
    expect(collectNeighbors(state, 2, 2)).toEqual({ dead: 6, sad: 2, happy: 0 });

});


test('animateNextFrame', () => {
    let state: GridState = parseGridStateFromEmoji(
        "😟🤗💀💀\n" +
        "💀😟💀💀\n" +
        "💀💀😟💀\n" +
        "💀💀💀😟")

    let expectedNextState: String =
        "😟🤗💀💀\n" +
        "😟😟😟💀\n" +
        "💀💀😟💀\n" +
        "💀💀💀💀\n"

    expect(toEmojiTextGrid(animateNextFrame(state))).toEqual(expectedNextState);
});






