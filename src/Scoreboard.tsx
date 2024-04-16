import styled from 'styled-components';

export type ScoreboardProps = {
    player1Score: number;
    player2Score: number;
};

export const Scoreboard = ({ player1Score, player2Score }: ScoreboardProps) => {
    return (
        <StyledScoreboard>
            {`Yellow ${player1Score} - ${player2Score} Red`}
        </StyledScoreboard>
    );
};

Scoreboard.defaultProps = {
    player1Score: 0,
    player2Score: 0
};

const StyledScoreboard = styled.div`
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
`;
