
import { GridState, CellState } from './types/GameState'
import GraphemeSplitter  from 'grapheme-splitter'

interface Neighborhood {
    dead: number;
    sad: number;
    happy: number;
}
export function collectNeighbors(state: GridState, row: number, col: number): Neighborhood {
    let dead: number = 0;
    let sad: number = 0;
    let happy: number = 0;

    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            if (dy === 0 && dx === 0) { }
            else {
                const neighbordRow = row + dy;
                const neighbordCol = col + dx;
                if (neighbordRow < 0 ||
                    neighbordCol < 0 ||
                    neighbordRow >= state.length ||
                    neighbordCol >= state[neighbordRow].length) {  //out of bounds locations  are considered dead cells
                    dead++;
                } else {
                    const cell = state[neighbordRow][neighbordCol];
                    switch (cell) {
                        case CellState.DEAD: dead++; break;
                        case CellState.SAD: sad++; break;
                        case CellState.HAPPY: happy++; break;
                        default:
                            throw new Error(`invalid cell value: ${cell} at (${neighbordRow},${neighbordCol})`)
                    }
                }
            }
        }
    }

    //the sum of neighbors must always be 8 
    if (dead + sad + happy !== 8) {
        throw new Error(`invalid total of neighbors,  dead(${dead}) + sad ${sad} + happy ${happy}  =  ${dead + sad + happy})`)
    }
    return { dead, sad, happy };

}

export function newCellFrom(cell: CellState, neighbors: Neighborhood): CellState {

    // All other cells become or remain dead.
    let newCell: CellState = CellState.DEAD
    switch (cell) {
        case CellState.DEAD:
            if (// Any dead cell with exactly three sad neighbors becomes a sad cell.
                neighbors.sad === 3 ||
                // Any dead cell with exactly two sad neighbors and 1 happy neighbor becomes a sad cell.
                (neighbors.sad === 2 && neighbors.happy === 1)) {
                newCell = CellState.SAD;
            } else {
                // Any dead cell with exactly one sad neighbor and 2 happy neighbors becomes a happy cell.
                if ((neighbors.sad === 1 && neighbors.happy === 2) ||
                    // Any dead cell with exactly 3 happy neighbors becomes a happy cell.
                    (neighbors.happy === 3)
                ) {
                    newCell = CellState.HAPPY
                }
            }

            break;

        case CellState.SAD:
        case CellState.HAPPY:
            // Any sad or happy cell with a combined total of exactly two or three sad or happy neighbours survives.
            const combinedTotal = neighbors.sad + neighbors.happy;
            if (combinedTotal === 2 || combinedTotal === 3) {
                newCell = cell;
            }

            break;
        default:
            throw new Error(`invalid cell value: ${cell}`)
    }
    return newCell;

}


export function animateNextFrame(state: GridState): GridState {
    let newGridState: GridState = new Array(state.length);

    for (let rowIndex = 0; rowIndex < state.length; rowIndex++) {
        const row = state[rowIndex];
        newGridState[rowIndex] = new Array(row.length);
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            const neighbors = collectNeighbors(state, rowIndex, colIndex);
            const cell = row[colIndex];
            newGridState[rowIndex][colIndex] = newCellFrom(cell, neighbors)
        }
    }
    return newGridState;
};

//TODO move to handy testing module , and convert to dictionary
function stateToEmoji(cell: CellState): String {
    let emoji: String;
    switch (cell) {
        case CellState.DEAD: emoji = "💀"; break;
        case CellState.SAD: emoji = "😟"; break;
        case CellState.HAPPY: emoji = "🤗"; break;
        default: emoji = "⬜️"
    }
    return emoji;
}

function emojiToCellState (emoji: String): CellState{
    
    switch(emoji){
      case  "💀": return CellState.DEAD;
      case "😟":  return CellState.SAD;
      case  "🤗":  return CellState.HAPPY;
        
    }
    throw new Error(`invalid emoji : ${emoji}`)
}

export function parseGridStateFromEmoji(emojiGrid: String): GridState{
    let lines = emojiGrid.split("\n");
    const splitter = new GraphemeSplitter()
    let state:GridState = lines.map((line)=>{
         const emojis = splitter.splitGraphemes(line)
         let row = new Array(emojis.length)
         
         emojis.forEach((emoji,col)=>{
               row[col] = emojiToCellState(emoji);
         });
         
          return row;
    } );

    return state;
}


export function toEmojiTextGrid(state: GridState): String {
    let asEmojiGrid: String = "";
    for (let rowIndex = 0; rowIndex < state.length; rowIndex++) {
        const row = state[rowIndex];
        let currRowStr: String = "";
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            const cell = row[colIndex];
            currRowStr = `${currRowStr}${stateToEmoji(cell)}`;

        }
        asEmojiGrid = `${asEmojiGrid}${currRowStr}\n`;
    }

    return asEmojiGrid

}