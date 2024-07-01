import { GameplayArea } from '@/connect-4-ui/GameplayArea';
import './App.css';
import '@/connect-4-ui/GameplayArea';
import GameFactory from '@/connect-4-domain/game';
import { useState } from 'react';
import { GameOverviewProps } from '@/connect-4-ui/GameOverview';
import { BoardProps, GridBoardCellProps } from '@/connect-4-ui/Board';
import { createMovePlayerCommand } from '@/connect-4-domain/commands';

function createHandleStartGameClick(
    setGame: (game: GameFactory) => void,
    setActiveGame: (activeGame: {
        gameOverview: GameOverviewProps;
        board: BoardProps;
    }) => void
): () => void {
    return function handleStartGameClick(): void {
        const game = new GameFactory();
        setGame(game);
        setActiveGame({
            gameOverview: {
                round: {
                    roundNumber: 1
                },
                playerRoundOverviews: {
                    playerOne: {
                        player: 1,
                        remainingDiscs: game.getPlayerStats(1).remainingDiscs,
                        isActiveTurn: game.getActivePlayer() === 1,
                        discColour: 'yellow'
                    },
                    playerTwo: {
                        player: 2,
                        remainingDiscs: game.getPlayerStats(2).remainingDiscs,
                        isActiveTurn: game.getActivePlayer() === 2,
                        discColour: 'red'
                    }
                },
                status: game.getStatus()
            },
            board: {
                onClick: createHandleBoardCellClick(game, setActiveGame),
                cells: game.getBoard()
            } satisfies BoardProps
        });
    };
}

function createHandleBoardCellClick(
    game: GameFactory,
    activeGame: {
        gameOverview: GameOverviewProps;
        board: BoardProps;
    },
    setActiveGame: (activeGame: {
        gameOverview: GameOverviewProps;
        board: BoardProps;
    }) => void
) {
    return function handleBoardCellClick({
        row,
        column
    }: GridBoardCellProps): void {
        const movePlayerCommand = createMovePlayerCommand({
            player: game.getActivePlayer(),
            targetCell: {
                row,
                column
            }
        });

        game.move(movePlayerCommand);
        setActiveGame({
            gameOverview: {
                round: activeGame.gameOverview.round,
                playerRoundOverviews: {
                    playerOne: {
                        player: 1,
                        remainingDiscs: game.getPlayerStats(1).remainingDiscs,
                        isActiveTurn: game.getActivePlayer() === 1,
                        discColour: 'yellow'
                    },
                    playerTwo: {
                        player: 2,
                        remainingDiscs: game.getPlayerStats(2).remainingDiscs,
                        isActiveTurn: game.getActivePlayer() === 2,
                        discColour: 'red'
                    }
                },
                status: game.getStatus()
            },
            board: {
                cells: game.getBoard()
            } satisfies BoardProps
        });
    };
}

const App = () => {
    const [game, setGame] = useState<GameFactory>();
    const [activeGame, setActiveGame] = useState<{
        gameOverview: GameOverviewProps;
        board: BoardProps;
    }>();

    return (
        <GameplayArea
            activeGame={activeGame}
            onStartGameClick={createHandleStartGameClick(
                setGame,
                setActiveGame
            )}
            onBoardCellClick={createHandleBoardCellClick(
                game!,
                activeGame!,
                setActiveGame
            )}
        />
    );
};

export default App;
