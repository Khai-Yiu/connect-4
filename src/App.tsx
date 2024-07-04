import { GameplayArea } from '@/connect-4-ui/GameplayArea';
import '@/App.css';
import '@/connect-4-ui/GameplayArea';
import GameFactory from '@/connect-4-domain/game';
import { MutableRefObject, useRef, useState } from 'react';
import { GameOverviewProps } from '@/connect-4-ui/GameOverview';
import { BoardProps, GridBoardCellProps } from '@/connect-4-ui/Board';
import createGameApi, { GameApi } from '@/connect-4-ui/game-api';
import Overlay from './connect-4-ui/Overlay';
import { createPortal } from 'react-dom';
import { GameUuid } from './connect-4-domain/game-types';
import LoadGameDialog from './connect-4-ui/LoadGameDialog';
import SavedGame from './connect-4-ui/SavedGame';

function createHandleStartGameClick(
    setActiveGame: (activeGame: {
        gameOverview: GameOverviewProps;
        board: BoardProps;
    }) => void,
    gameApiRef: MutableRefObject<GameApi | null>
): () => void {
    return function handleStartGameClick(): void {
        gameApiRef.current = createGameApi(new GameFactory());
        setActiveGame({
            gameOverview: {
                round: {
                    roundNumber: 1
                },
                playerRoundOverviews: {
                    playerOne: {
                        player: 1,
                        remainingDiscs: gameApiRef.current.getRemainingDiscs(1),
                        isActiveTurn:
                            gameApiRef.current.getActivePlayer() === 1,
                        discColour: 'yellow'
                    },
                    playerTwo: {
                        player: 2,
                        remainingDiscs: gameApiRef.current.getRemainingDiscs(2),
                        isActiveTurn:
                            gameApiRef.current.getActivePlayer() === 2,
                        discColour: 'red'
                    }
                },
                status: gameApiRef.current.getStatus()
            },
            board: {
                onClick: createHandleBoardCellClick(
                    gameApiRef.current,
                    setActiveGame
                ),
                cells: gameApiRef.current.getBoard()
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

function createHandleSaveGameClick(
    savedGamesRef: MutableRefObject<GameUuid[]>,
    gameApi: GameApi
): () => void {
    return function handleSaveGameClick() {
        const newGameId = gameApi.saveGame();
        savedGamesRef.current.push(newGameId);
    };
}

function createHandleLoadGameClick(
    setActiveGame: (activeGame: {
        gameOverview: GameOverviewProps;
        board: BoardProps;
    }) => void,
    setShowOverlay: (value: boolean) => void,
    gameApi: GameApi
): (gameId: GameUuid) => void {
    return function handleLoadGameClick(gameId: GameUuid): void {
        setShowOverlay(false);
        gameApi.loadGame(gameId);
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
    const [showOverlay, setShowOverlay] = useState<Boolean>(false);
    const savedGamesRef = useRef([]);
    const gameApiRef = useRef(null);

    return (
        <>
            {showOverlay &&
                createPortal(
                    <Overlay
                        componentSpec={{
                            Component: ({
                                handleClose
                            }: {
                                handleClose: () => void;
                            }): React.ReactElement<typeof LoadGameDialog> => (
                                <LoadGameDialog handleClose={handleClose}>
                                    {savedGamesRef.current.map(
                                        (
                                            gameId: GameUuid
                                        ): React.ReactElement<
                                            typeof SavedGame
                                        > => (
                                            <SavedGame
                                                gameId={gameId}
                                                savedDate={new Date()}
                                                handleLoadGame={createHandleLoadGameClick(
                                                    setActiveGame,
                                                    setShowOverlay,
                                                    gameApiRef.current!
                                                )}
                                            />
                                        )
                                    )}
                                </LoadGameDialog>
                            ),
                            props: {
                                handleClose: () => {
                                    setShowOverlay(false);
                                }
                            }
                        }}
                    ></Overlay>,
                    document.body
                )}
            <GameplayArea
                activeGame={activeGame}
                onStartGameClick={createHandleStartGameClick(
                    setActiveGame,
                    gameApiRef
                )}
                onSaveGameClick={createHandleSaveGameClick(
                    savedGamesRef,
                    gameApiRef.current!
                )}
                onLoadGameClick={() => setShowOverlay(true)}
            />
        </>
    );
};

export default App;
