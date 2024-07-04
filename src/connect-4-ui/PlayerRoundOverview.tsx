import styled from 'styled-components';

export type PlayerRoundOverviewProps = {
    player?: 1 | 2;
    remainingDiscs: number;
    isActiveTurn: boolean;
    discColour: string;
};

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #a2a8d3;
    color: white;
    font-size: 1rem;
    padding: 10px 0;
    width: 100%;
    font-family: monospace;
`;

const StyledTopContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    flex-wrap: wrap;
`;

const StyledBottomContainer = styled.div`
    text-align: left;
    padding: 5px 10px;
`;

const StyledToken = styled.div<{ $isActiveTurn: boolean; $discColour: string }>`
    background-color: ${({ $isActiveTurn, $discColour }) =>
        $isActiveTurn ? $discColour : 'initial'};
    border: ${({ $isActiveTurn }) =>
        $isActiveTurn ? '3px white dotted' : 'none'};
    border-radius: 50%;
    height: 40px;
    min-width: 40px;
    margin-left: 20px;
    box-sizing: border-box;
`;

export const PlayerRoundOverview = ({
    player,
    remainingDiscs,
    isActiveTurn,
    discColour
}: PlayerRoundOverviewProps) => (
    <StyledWrapper>
        <StyledTopContainer>
            <p>{`Player: ${player}`}</p>
            <StyledToken
                $isActiveTurn={isActiveTurn}
                $discColour={discColour}
            />
        </StyledTopContainer>
        <StyledBottomContainer>
            <p>{`Remaining discs: ${remainingDiscs}`}</p>
        </StyledBottomContainer>
    </StyledWrapper>
);
