import styled from 'styled-components';

export type RoundProps = {
    roundNumber: number;
};

const StyledRoundNumber = styled.div`
    text-align: center;
    padding: 4px 0;
    background-color: blue;
    color: white;
    border-radius: 16px 16px 0 0;
    border: 3px solid black;
    border-bottom: none;
    width: 100%;
    font-size: 2rem;
`;

export const Round = ({ roundNumber }: RoundProps) => (
    <StyledRoundNumber>{`Round: ${roundNumber}`}</StyledRoundNumber>
);

Round.defaultProps = {
    roundNumber: 1
};
