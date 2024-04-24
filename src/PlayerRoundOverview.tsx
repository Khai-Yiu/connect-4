import styled from 'styled-components';

export type PlayerRoundOverviewProps = {
    player?: 1 | 2;
    remainingTokens: number;
    isActiveTurn: boolean;
    tokenColour: string;
};

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: blue;
    color: white;
    font-size: 1.2rem;
    padding: 10px 10px;
    max-width: 50%;
`;

const StyledRow = styled.div`
    display: flex;
    align-items: center;
`;

const StyledToken = styled.div<{ isActiveTurn: boolean; tokenColour: string }>`
    background-color: ${({ isActiveTurn, tokenColour }) =>
        isActiveTurn ? tokenColour : 'initial'};
    border: ${({ isActiveTurn }) =>
        isActiveTurn ? '3px white dotted' : 'none'};
    border-radius: 50%;
    height: 40px;
    width: 40px;
    margin-left: 20px;
`;

export const PlayerRoundOverview = ({
    player,
    remainingTokens,
    isActiveTurn,
    tokenColour
}: PlayerRoundOverviewProps) => (
    <StyledWrapper>
        <StyledRow>
            <p>{`Player number: ${player}`}</p>
            <StyledToken
                isActiveTurn={isActiveTurn}
                tokenColour={tokenColour}
            />
        </StyledRow>
        <p>{`Remaining tokens: ${remainingTokens}`}</p>
    </StyledWrapper>
);
