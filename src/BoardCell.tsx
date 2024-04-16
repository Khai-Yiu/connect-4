import styled from 'styled-components';

export type StyledBoardCellDiscCutOutProps = {
    $player?: 1 | 2;
    $isDiscHighlighted?: boolean;
    $currentTurn?: 1 | 2;
};

export type StyledBoardCellProps = {
    $isCellHighlighted?: boolean;
};

export type BoardCellProps = {
    player?: 1 | 2;
    uuid: string;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    isCellHighlighted?: boolean;
    isDiscHighlighted?: boolean;
    currentTurn?: 1 | 2;
};

export const BoardCell = ({
    player,
    onClick,
    onMouseEnter,
    onMouseLeave,
    isCellHighlighted,
    isDiscHighlighted,
    currentTurn
}: BoardCellProps) => (
    <StyledBoardCell
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        $isCellHighlighted={isCellHighlighted}
    >
        <StyledBoardCellDiscCutOut
            $player={player}
            $isDiscHighlighted={isDiscHighlighted}
            $currentTurn={currentTurn}
        />
    </StyledBoardCell>
);

BoardCell.defaultProps = {
    uuid: crypto.randomUUID()
};

const StyledBoardCell = styled.div<StyledBoardCellProps>`
    width: 60px;
    height: 60px;
    background: ${({ $isCellHighlighted }) =>
        $isCellHighlighted ? 'royalblue' : 'blue'};
    cursor: pointer;
`;

const StyledBoardCellDiscCutOut = styled.div<StyledBoardCellDiscCutOutProps>`
    position: relative;
    top: 5px;
    left: 5px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: ${({ $player, $isDiscHighlighted, $currentTurn }) => {
        if ($currentTurn === 1 && $isDiscHighlighted) {
            return '#FFFAA0';
        } else if ($currentTurn === 2 && $isDiscHighlighted) {
            return '#FAA0A0';
        } else if ($player === 1) {
            return 'yellow';
        } else if ($player === 2) {
            return 'red';
        } else {
            return 'white';
        }
    }};
`;
