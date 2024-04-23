import styled from 'styled-components';
import { BoardCellProps, BoardCell } from '@/BoardCell';
import createCells from './create-cells';

export type BoardProps = {
    cells: Array<Array<BoardCellProps>>;
};

export type GridBoardCellProps = {
    row: number;
    column: number;
};

export const Board = ({ cells }: BoardProps) => {
    const mapOfBoardCells = cells.flatMap((row, rowIndex) =>
        row.map((currentCellProps, columnIndex) => (
            <GridBoardCell
                key={currentCellProps.uuid}
                player={currentCellProps.player}
                uuid={currentCellProps.uuid}
                row={rowIndex + 1}
                column={columnIndex + 1}
            />
        ))
    );

    return <StyledBoard>{mapOfBoardCells}</StyledBoard>;
};

Board.defaultProps = {
    cells: createCells(6, 7)
};

const StyledBoard = styled.div`
    display: grid;
    grid-auto-rows: max-content;
    grid-auto-columns: max-content;
`;

const GridBoardCell = styled(BoardCell)<GridBoardCellProps>`
    grid-row: ${({ row }) => row};
    grid-column: ${({ column }) => column};
`;
