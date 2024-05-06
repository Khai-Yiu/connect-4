import styled from 'styled-components';
import { GameOverview, GameOverviewProps } from '@/connect-4-ui/GameOverview';
import { Board, BoardProps } from '@/connect-4-ui/Board';

export type GameplayAreaProps = {
    activeGame?: {
        gameOverview: GameOverviewProps;
        board: BoardProps;
    };
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
`;

const StyledGameplayWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
`;

export const GameplayArea = ({ activeGame }: GameplayAreaProps) => (
    <StyledGameplayArea activeGame={activeGame}>
        {activeGame ? (
            <StyledGameplayWrapper>
                <GameOverview {...activeGame.gameOverview} />
                <Board {...activeGame.board} />
            </StyledGameplayWrapper>
        ) : (
            <StyledButton>Start Game!</StyledButton>
        )}
    </StyledGameplayArea>
);
