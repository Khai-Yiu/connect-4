import styled from 'styled-components';
import { BoardCellProps, BoardCell } from '@//connect-4-ui/BoardCell';
import createCells from '@/connect-4-ui/create-cells';

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

    return <StyledBoard cells={cells}>{mapOfBoardCells}</StyledBoard>;
};

Board.defaultProps = {
    cells: createCells(6, 7)
};

const StyledBoard = styled.div<BoardProps>`
    --row: ${({ cells }) => cells.length};
    --column: ${({ cells }) => cells[0].length};
    --size: min(80vh, 80vw);

    display: grid;
    grid-template-columns: repeat(var(--column), 1fr);
    grid-template-rows: repeat(var(--row), 1fr);
    width: var(--size);
    height: calc(var(--row) * var(--size) / var(--column));
    border: 3px solid black;
    border-top: none;
`;

const GridBoardCell = styled(BoardCell)<GridBoardCellProps>`
    grid-row: ${({ row }) => row};
    grid-column: ${({ column }) => column};
`;
