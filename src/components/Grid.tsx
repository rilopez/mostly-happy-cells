import React, { useState, useEffect } from 'react';
import { GridState, CellState } from '../types/GameState';
import {stateToEmoji} from '../engine'

import './Grid.css'

type Props = {
  state: GridState
}


const renderColumns = (rowIdx:number, columns: CellState[]) => {
   return columns.map((c, colIdx) => <td className="cell" key={"col"+rowIdx+"-"+colIdx}> {stateToEmoji(c)} </td>);
}
const renderRows = (state: GridState)=>{

    return state.map((r, rowIdx) => <tr key={"row"+rowIdx}>{renderColumns(rowIdx, r)}</tr>);

}
const Grid = (props: Props) => {
    const rows = renderRows(props.state);
    return (
        <table>
            <tbody>
                {rows}
            </tbody>
        </table>
        );
}

export default Grid;