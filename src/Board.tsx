import styled from 'styled-components';
import { BoardCell, BoardCellProps } from '@/BoardCell';
import React from 'react';
import createCells from './create-cells';

export type BoardProps = {
    cells: Array<Array<BoardCellProps>>;
};

export const Board = ({ cells }: BoardProps) => {
    const mapOfBoardCells = cells.map((row) => (
        <>
            {row.map((currentCell) => (
                <BoardCell {...currentCell} />
            ))}
        </>
    ));

    return (
        <StyleBoard $columns={cells[0].length}>{mapOfBoardCells}</StyleBoard>
    );
};

Board.defaultProps = {
    cells: createCells(6, 7)
};

const StyleBoard = styled.div<{ $columns: number }>`
    display: grid;
    grid-template-columns: repeat(${({ $columns }) => $columns}, 60px);
`;
