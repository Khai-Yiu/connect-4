import { GameUuid } from '@/connect-4-domain/game-types';
import styled from 'styled-components';

type SavedGameProps = {
    gameId: GameUuid;
    savedDate: Date;
    handleLoadGame?: (gameId: GameUuid) => void;
};

const StyledSavedGame = styled.div`
    border: 2px solid white;
    padding: 20px;
    background-color: lightblue;
    font-family: monospace;
    width: 90%;
    margin: 10px;
`;

const StyledLoadButton = styled.button`
    margin-top: -5px;
    background-color: cyan;
    font-weight: bold;
    border: 2px solid white;
    cursor: pointer;
`;

const StyledWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const SavedGame = ({
    gameId,
    savedDate,
    handleLoadGame = () => {}
}: SavedGameProps) => {
    return (
        <StyledSavedGame>
            <StyledWrapper>
                <p>{`Game ID: ${gameId}`}</p>
                <StyledLoadButton onClick={() => handleLoadGame(gameId)}>
                    Load
                </StyledLoadButton>
            </StyledWrapper>
            <p>{`Date saved: ${savedDate.toString()}`}</p>
        </StyledSavedGame>
    );
};

export default SavedGame;
