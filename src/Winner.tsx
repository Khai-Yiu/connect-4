import styled from 'styled-components';

export type WinnerProps = {
    winner?: 1 | 2;
};

const StyledWinner = styled.div`
    text-align: center;
    padding: 12px 0;
    background-color: blue;
    color: white;
    border-radius: 0 0 16px 16px;
    border: 3px solid black;
    border-top: none;
    width: 100%;
    font-size: 2rem;
`;

export const Winner = ({ winner }: WinnerProps) =>
    winner ? (
        <StyledWinner>{`Player ${winner} has won the game!`}</StyledWinner>
    ) : null;
