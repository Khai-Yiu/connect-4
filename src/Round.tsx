import styled from 'styled-components';

export type RoundProps = {
    roundNumber: number;
};

const StyledRoundNumber = styled.div`
    text-align: center;
    padding: 4px 0;
    background-color: blue;
    color: white;
    border-radius: 10px 10px 0 0;
    max-width: 50%;
`;

export const Round = ({ roundNumber }: RoundProps) => (
    <StyledRoundNumber>{`Round: ${roundNumber}`}</StyledRoundNumber>
);

Round.defaultProps = {
    roundNumber: 1
};
