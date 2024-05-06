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
    display: flex;
    justify-content: center;
    align-items: center;
    background: blue;
`;

const StyledPlayerToken = styled.div<{ $player?: 1 | 2 }>`
    width: calc(100% * 5 / 6);
    height: calc(100% * 5 / 6);
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
