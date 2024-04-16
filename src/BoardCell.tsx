import styled from 'styled-components';

export type StyledBoardDCellDiscCutOutProps = {
    $player?: 1 | 2;
};

export type BoardCellProps = {
    player?: 1 | 2;
    uuid: string;
};

export const BoardCell = ({ player }: BoardCellProps) => (
    <StyledBoardCell>
        <StyledBoardCellDiscCutOut player={player} />
    </StyledBoardCell>
);

BoardCell.defaultProps = {
    player: undefined,
    uuid: crypto.randomUUID()
};

const StyledBoardCell = styled.div`
    width: 60px;
    height: 60px;
    background: blue;
`;

const StyledBoardCellDiscCutOut = styled.div<{ player?: 1 | 2 }>`
    position: relative;
    top: 5px;
    left: 5px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: ${({ player }) => {
        switch (player) {
            case 1:
                return 'yellow';
            case 2:
                return 'red';
            default:
                return 'white';
        }
    }};
`;
