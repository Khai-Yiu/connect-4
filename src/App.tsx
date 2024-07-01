import { GameplayArea } from '@/connect-4-ui/GameplayArea';
import '@/App.css';
import '@/connect-4-ui/GameplayArea';
import GameFactory from '@/connect-4-domain/game';
import { useRef, useState } from 'react';
import { GameOverviewProps } from '@/connect-4-ui/GameOverview';
import { BoardProps, GridBoardCellProps } from '@/connect-4-ui/Board';
import createGameApi, { GameApi } from '@/connect-4-ui/game-api';

function createHandleStartGameClick(
    setActiveGame: (activeGame: {
        gameOverview: GameOverviewProps;
        board: BoardProps;
    }) => void,
    gameApi: GameApi
): () => void {
    return function handleStartGameClick(): void {
        setActiveGame({
            gameOverview: {
                round: {
                    roundNumber: 1
                },
                playerRoundOverviews: {
                    playerOne: {
                        player: 1,
                        remainingDiscs: gameApi.getRemainingDiscs(1),
                        isActiveTurn: gameApi.getActivePlayer() === 1,
                        discColour: 'yellow'
                    },
                    playerTwo: {
                        player: 2,
                        remainingDiscs: gameApi.getRemainingDiscs(2),
                        isActiveTurn: gameApi.getActivePlayer() === 2,
                        discColour: 'red'
                    }
                },
                status: gameApi.getStatus()
            },
            board: {
                onClick: createHandleBoardCellClick(gameApi, setActiveGame),
                cells: gameApi.getBoard()
            } satisfies BoardProps
        });
    };
}

function createHandleBoardCellClick(
    gameApi: GameApi,
    setActiveGame: (activeGame: {
        gameOverview: GameOverviewProps;
        board: BoardProps;
    }) => void
) {
    return function handleBoardCellClick({
        row,
        column
    }: GridBoardCellProps): void {
        const player = gameApi.getActivePlayer();
        const handlePlayerMove =
            gameApi.getBoard()[row][column].handlePlayerMove;
        handlePlayerMove(player);
        setActiveGame({
            gameOverview: {
                round: {
                    roundNumber: 1
                },
                playerRoundOverviews: {
                    playerOne: {
                        player: 1,
                        remainingDiscs: gameApi.getRemainingDiscs(1),
                        isActiveTurn: gameApi.getActivePlayer() === 1,
                        discColour: 'yellow'
                    },
                    playerTwo: {
                        player: 2,
                        remainingDiscs: gameApi.getRemainingDiscs(2),
                        isActiveTurn: gameApi.getActivePlayer() === 2,
                        discColour: 'red'
                    }
                },
                status: gameApi.getStatus()
            },
            board: {
                onClick: createHandleBoardCellClick(gameApi, setActiveGame),
                cells: gameApi.getBoard()
            } satisfies BoardProps
        });
    };
}

const App = () => {
    const [activeGame, setActiveGame] = useState<{
        gameOverview: GameOverviewProps;
        board: BoardProps;
    }>();
    const gameApiRef = useRef(createGameApi(new GameFactory()));

    return (
        <GameplayArea
            activeGame={activeGame}
            onStartGameClick={createHandleStartGameClick(
                setActiveGame,
                gameApiRef.current
            )}
        />
    );
};

export default App;
