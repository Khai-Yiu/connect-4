import styled from 'styled-components';
import { BoardCell, BoardCellProps } from '@/BoardCell';
import createCells from './create-cells';

export type BoardProps = {
    cells: Array<Array<BoardCellProps>>;
};

export const Board = ({ cells }: BoardProps) => {
    const mapOfBoardCells = cells.map((row) => (
        <>
            {row.map((currentCellProps) => (
                <BoardCell {...currentCellProps} />
            ))}
        </>
    ));

    return (
        <StyledBoard $columns={cells[0].length}>{mapOfBoardCells}</StyledBoard>
    );
};

Board.defaultProps = {
    cells: createCells(6, 7)
};

const StyledBoard = styled.div<{ $columns: number }>`
    display: grid;
    grid-template-columns: repeat(${({ $columns }) => $columns}, 60px);
`;
