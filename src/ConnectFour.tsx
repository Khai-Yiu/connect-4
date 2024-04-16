import { useState } from 'react';
import { Board } from '@/Board';
import { Scoreboard } from '@/Scoreboard';
import createCells from '@/create-cells';
import checkForWin from '@/check-for-win';
import styled from 'styled-components';

export type ConnectFourProps = {
    rows: number;
    columns: number;
};

export const ConnectFour = ({ rows, columns }: ConnectFourProps) => {
    const [playerTurn, setPlayerTurn] = useState(1);
    const [cells, setCells] = useState(createCells(rows, columns));
    const [highlightedCell, setHighlightedCell] = useState<{
        rowToHighlight?: number;
        columnToHighlight?: number;
        currentTurn?: 1 | 2;
    }>({});
    const [playerScores, setPlayerScores] = useState<{
        player1Score: number;
        player2Score: number;
    }>({ player1Score: 0, player2Score: 0 });

    const handleCellClick = (columnIndex: number) => {
        const newCells = cells.map((row) => [...row]);
        let rowIndex;

        for (rowIndex = rows - 1; rowIndex >= 0; rowIndex--) {
            if (newCells[rowIndex][columnIndex].player === undefined) {
                newCells[rowIndex][columnIndex] = {
                    player: playerTurn as 1 | 2
                };

                setCells(newCells);
                setPlayerTurn(playerTurn === 1 ? 2 : 1);

                break;
            }
        }

        if (rowIndex > 0) {
            setHighlightedCell({
                rowToHighlight: rowIndex - 1,
                columnToHighlight: columnIndex,
                currentTurn: playerTurn as 1 | 2
            });
        } else {
            setHighlightedCell({});
        }

        if (
            rowIndex >= 0 &&
            checkForWin(newCells, rowIndex, columnIndex, playerTurn as 1 | 2)
        ) {
            if (playerTurn === 1) {
                setPlayerScores({
                    ...playerScores,
                    player1Score: playerScores.player1Score + 1
                });
            } else if (playerTurn === 2) {
                setPlayerScores({
                    ...playerScores,
                    player2Score: playerScores.player2Score + 1
                });
            }

            alert(`Player ${playerTurn} won!`);
            resetGame();
        }
    };

    const handleCellEnter = (columnIndex: number) => {
        let rowIndex;

        for (rowIndex = rows - 1; rowIndex >= 0; rowIndex--) {
            if (cells[rowIndex][columnIndex].player === undefined) {
                break;
            }
        }

        setHighlightedCell({
            rowToHighlight: rowIndex,
            columnToHighlight: columnIndex,
            currentTurn: playerTurn as 1 | 2
        });
    };

    const handleCellLeave = () => {
        setHighlightedCell({ currentTurn: playerTurn as 1 | 2 });
    };

    const resetGame = () => {
        setCells(createCells(rows, columns));
        setPlayerTurn(1);
    };

    return (
        <StyledWrapper>
            <Scoreboard
                player1Score={playerScores.player1Score}
                player2Score={playerScores.player2Score}
            ></Scoreboard>
            <Board
                cells={cells}
                onCellClick={handleCellClick}
                onCellEnter={handleCellEnter}
                onCellLeave={handleCellLeave}
                highlightedCell={highlightedCell}
            />
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: fit-content;
`;
