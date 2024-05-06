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
    padding: 10px 0;
    width: 100%;
`;

const StyledTopContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
`;

const StyledBottomContainer = styled.div`
    padding: 0 10px;
`;

const StyledToken = styled.div<{ isActiveTurn: boolean; tokenColour: string }>`
    background-color: ${({ isActiveTurn, tokenColour }) =>
        isActiveTurn ? tokenColour : 'initial'};
    border: ${({ isActiveTurn }) =>
        isActiveTurn ? '3px white dotted' : 'none'};
    border-radius: 50%;
    height: 40px;
    min-width: 40px;
    margin-left: 20px;
    box-sizing: border-box;
`;

export const PlayerRoundOverview = ({
    player,
    remainingTokens,
    isActiveTurn,
    tokenColour
}: PlayerRoundOverviewProps) => (
    <StyledWrapper>
        <StyledTopContainer>
            <p>{`Player number: ${player}`}</p>
            <StyledToken
                isActiveTurn={isActiveTurn}
                tokenColour={tokenColour}
            />
        </StyledTopContainer>
        <StyledBottomContainer>
            <p>{`Remaining tokens: ${remainingTokens}`}</p>
        </StyledBottomContainer>
    </StyledWrapper>
);
