import {
    PlayerRoundOverview,
    PlayerRoundOverviewProps
} from '@/PlayerRoundOverview';
import styled from 'styled-components';

export type PlayerRoundOverviewsProps = {
    playerOne: PlayerRoundOverviewProps;
    playerTwo: PlayerRoundOverviewProps;
};

const StyledWrapper = styled.div`
    display: flex;
`;

export const PlayerRoundOverviews = ({
    playerOne,
    playerTwo
}: PlayerRoundOverviewsProps) => (
    <StyledWrapper>
        <PlayerRoundOverview {...playerOne} />
        <PlayerRoundOverview {...playerTwo} />
    </StyledWrapper>
);
