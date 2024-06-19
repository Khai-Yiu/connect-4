import styled from 'styled-components';

export type StyledPlayerToken = {
    $player?: 1 | 2;
};

export type BoardCellProps = {
    className?: string;
    player?: 1 | 2;
    uuid?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
};

export const BoardCell = ({
    className,
    player,
    uuid = crypto.randomUUID(),
    onClick
}: BoardCellProps) => (
    <StyledBoardCell className={className} onClick={onClick}>
        <StyledPlayerToken $player={player} />
    </StyledBoardCell>
);

export const StyledBoardCell = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: blue;
    height: 100%;
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
