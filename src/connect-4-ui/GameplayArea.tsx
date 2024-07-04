import styled from 'styled-components';
import { GameOverview, GameOverviewProps } from '@/connect-4-ui/GameOverview';
import { Board, BoardProps } from '@/connect-4-ui/Board';
import GameplayAreaMenu from '@/connect-4-ui/GameplayAreaMenu';
import MenuButton from '@/connect-4-ui/MenuButton';
import { GameUuid } from '@/connect-4-domain/game-types';

export type GameplayAreaProps = {
    activeGame?: {
        gameOverview: GameOverviewProps;
        board: BoardProps;
    };
    onStartGameClick: () => void;
    onSaveGameClick: () => void;
    onLoadGameClick: (gameId: GameUuid) => void;
};

const StyledGameplayArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const StyledButton = styled.button`
    font-size: 2rem;
    background-color: #a2a8d3;
    color: white;
    padding: 10px 10px;
    border: 5px cyan solid;
    font-family: monospace;
    cursor: pointer;
    border-radius: 8px;

    &:hover {
        border-color: white;
    }

    &:focus,
    &:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
    }
`;

const StyledTitle = styled.h1`
    font-size: 80px;
    font-family: monospace;
    color: cyan;
`;

const StyledGameplayWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    gap: 40px;

    @media (min-width: 1100px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }
`;

const StyledGameplayAreaWrapper = styled.div`
    height: 90vh;
`;

export const GameplayArea = ({
    activeGame,
    onStartGameClick = () => {},
    onSaveGameClick = () => {},
    onLoadGameClick = () => {}
}: GameplayAreaProps) => (
    <StyledGameplayAreaWrapper>
        <GameplayAreaMenu>
            <MenuButton text={'New Game'} onClick={onStartGameClick} />
            <MenuButton text={'Save Game'} onClick={onSaveGameClick} />
            <MenuButton text={'Load Game'} onClick={onLoadGameClick} />
        </GameplayAreaMenu>
        <StyledGameplayArea>
            {activeGame ? (
                <StyledGameplayWrapper>
                    <GameOverview {...activeGame.gameOverview} />
                    <Board {...activeGame.board} />
                </StyledGameplayWrapper>
            ) : (
                <>
                    <StyledTitle>Connect4</StyledTitle>
                    <StyledButton onClick={onStartGameClick}>
                        Start Game!
                    </StyledButton>
                </>
            )}
        </StyledGameplayArea>
    </StyledGameplayAreaWrapper>
);
