import styled from 'styled-components';
import React from 'react';
import { BoardCell, BoardCellProps } from './BoardCell';
import createCells from './create-cells';

export type BoardProps = {
    cells: Array<Array<BoardCellProps>>;
    onCellClick: (columnIndex: number) => void;
    onCellEnter: (columnIndex: number) => void;
    onCellLeave: () => void;
    highlightedCell: {
        rowToHighlight?: number;
        columnToHighlight?: number;
        currentTurn?: 1 | 2;
    };
};

export const Board = ({
    cells,
    onCellClick,
    onCellEnter,
    onCellLeave,
    highlightedCell
}: BoardProps) => {
    const mapOfBoardCells = cells.map((row, rowIndex) => (
        <React.Fragment>
            {row.map((currentCell, columnIndex) => (
                <BoardCell
                    key={currentCell.uuid}
                    player={currentCell.player}
                    onClick={() => onCellClick(columnIndex)}
                    onMouseEnter={() => onCellEnter(columnIndex)}
                    onMouseLeave={onCellLeave}
                    isCellHighlighted={
                        highlightedCell.columnToHighlight === columnIndex
                    }
                    isDiscHighlighted={
                        highlightedCell.rowToHighlight === rowIndex &&
                        highlightedCell.columnToHighlight === columnIndex
                    }
                    currentTurn={highlightedCell.currentTurn}
                />
            ))}
        </React.Fragment>
    ));

    return (
        <StyledBoard $columns={cells[0].length}>{mapOfBoardCells}</StyledBoard>
    );
};

Board.defaultProps = {
    cells: createCells(6, 7),
    onCellClick: () => {},
    onCellEnter: () => {},
    onCellLeave: () => {},
    highlightedCell: {}
};

const StyledBoard = styled.div<{ $columns: number }>`
    display: grid;
    grid-template-columns: repeat(${({ $columns }) => $columns}, 60px);
`;
