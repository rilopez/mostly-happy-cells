
export enum CellState{
    DEAD=0,
    SAD,
    HAPPY,
}
export type GridState = CellState[][];

export interface GameState {
    id: string;
    m: number;
    n: number;
    state: GridState;
}

export function createGridState(rows: number, cols: number): GridState {
    let grid:GridState = new Array(rows);
    for (let index = 0; index < grid.length; index++) {
         grid[index] = new Array(cols);
         for (let col = 0; col < grid[index].length; col++) {
              grid[index][col] = CellState.DEAD;
         }
    }
    return grid;
}