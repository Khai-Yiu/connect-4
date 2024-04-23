import styled from 'styled-components';

export type StyledPlayerToken = {
    $player?: 1 | 2;
};

export type BoardCellProps = {
    className?: string;
    player?: 1 | 2;
    uuid: string;
};

export const BoardCell = ({ className, player }: BoardCellProps) => (
    <StyledBoardCell className={className}>
        <StyledPlayerToken $player={player} />
    </StyledBoardCell>
);

BoardCell.defaultProps = {
    player: undefined,
    uuid: crypto.randomUUID()
};

export const StyledBoardCell = styled.div`
    width: 60px;
    height: 60px;
    background: blue;
`;

const StyledPlayerToken = styled.div<{ $player?: 1 | 2 }>`
    position: relative;
    top: 5px;
    left: 5px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: ${({ $player }) => {
        switch ($player) {
            case 1:
                return 'yellow';
            case 2:
                return 'red';
            default:
                return 'white';
        }
    }};
`;
