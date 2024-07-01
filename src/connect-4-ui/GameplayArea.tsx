import styled from 'styled-components';
import { GameOverview, GameOverviewProps } from '@/connect-4-ui/GameOverview';
import { Board, BoardProps, GridBoardCellProps } from '@/connect-4-ui/Board';
import GameplayAreaMenu from './GameplayAreaMenu';

export type GameplayAreaProps = {
    activeGame?: {
        gameOverview: GameOverviewProps;
        board: BoardProps;
    };
    onStartGameClick?: () => void;
    onBoardCellClick?: ({ row, column }: GridBoardCellProps) => void;
};

const StyledGameplayArea = styled.div<GameplayAreaProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const StyledButton = styled.button`
    font-size: 2rem;
    background-color: blue;
    color: white;
    padding: 10px 10px;
    border: 5px cyan solid;
    font-family: monospace;
    cursor: pointer;
    border-radius: 8px;

    &:hover {
        border-color: #646cff;
    }

    &:focus,
    &:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
    }
`;

const StyledGameplayWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100vw;
    gap: 40px;

    @media (min-width: 1100px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }
`;

export const GameplayArea = ({
    activeGame,
    onStartGameClick
}: GameplayAreaProps) => (
    <>
        <GameplayAreaMenu />
        <StyledGameplayArea
            activeGame={activeGame}
            onStartGameClick={onStartGameClick}
        >
            {activeGame ? (
                <StyledGameplayWrapper>
                    <GameOverview {...activeGame.gameOverview} />
                    <Board {...activeGame.board} />
                </StyledGameplayWrapper>
            ) : (
                <StyledButton onClick={onStartGameClick}>
                    Start Game!
                </StyledButton>
            )}
        </StyledGameplayArea>
    </>
);
