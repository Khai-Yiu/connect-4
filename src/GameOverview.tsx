import styled from 'styled-components';
import {
    PlayerRoundOverviews,
    PlayerRoundOverviewsProps
} from '@/PlayerRoundOverviews';
import { Round, RoundProps } from '@/Round';

export type GameOverviewProps = {
    round: RoundProps;
    playerOverview: PlayerRoundOverviewsProps;
};

const StyledWrapper = styled.div`
    min-width: 50%;
`;

export const GameOverview = ({ round, playerOverview }: GameOverviewProps) => (
    <StyledWrapper>
        <Round {...round} />
        <PlayerRoundOverviews {...playerOverview} />
    </StyledWrapper>
);
