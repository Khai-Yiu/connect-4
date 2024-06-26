import styled from 'styled-components';
import { BoardCellProps, BoardCell } from '@//connect-4-ui/BoardCell';
import createCells from '@/connect-4-ui/create-cells';

export type ClickHandler = ({ row, column }: GridBoardCellProps) => void;

export type BoardProps = {
    cells?: Array<Array<BoardCellProps>>;
    onClick?: ClickHandler;
};

export type GridBoardCellProps = {
    row: number;
    column: number;
};

function createHandleBoardCellClick(
    { row, column }: GridBoardCellProps,
    onClick: ClickHandler
) {
    return function handleBoardCellClick() {
        onClick({ row, column });
    };
}

export const Board = (
    { cells = createCells(6, 7), onClick = () => {} }: BoardProps = {
        cells: createCells(6, 7),
        onClick: () => {}
    }
) => {
    const mapOfBoardCells = cells.flatMap((row, rowIndex) =>
        row.map((currentCellProps, columnIndex) => (
            <GridBoardCell
                key={currentCellProps.uuid}
                player={currentCellProps.player}
                uuid={currentCellProps.uuid}
                row={cells.length - rowIndex}
                column={columnIndex + 1}
                onClick={createHandleBoardCellClick(
                    { row: rowIndex, column: columnIndex },
                    onClick
                )}
            />
        ))
    );

    return <StyledBoard cells={cells}>{mapOfBoardCells}</StyledBoard>;
};

const StyledBoard = styled.div<BoardProps>`
    --row: ${({ cells }) => cells!.length};
    --column: ${({ cells }) => cells![0].length};
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
