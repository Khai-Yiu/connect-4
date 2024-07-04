import styled from 'styled-components';

export type StyledPlayerToken = {
    $player?: 1 | 2;
};

export type BoardCellProps = {
    className?: string;
    player?: 1 | 2;
    uuid?: string;
    onClick?: () => void;
};

export const BoardCell = ({
    className,
    player,
    uuid = crypto.randomUUID(),
    onClick
}: BoardCellProps) => (
    <StyledBoardCell key={uuid} className={className} onClick={onClick}>
        <StyledPlayerToken $player={player} />
    </StyledBoardCell>
);

export const StyledBoardCell = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #a2a8d3;
    height: 100%;
    cursor: pointer;
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

    :hover {
        background-color: 'green';
    }
`;
