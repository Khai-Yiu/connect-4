import styled from 'styled-components';
import {
    PlayerRoundOverviews,
    PlayerRoundOverviewsProps
} from '@/PlayerRoundOverviews';
import { Round, RoundProps } from '@/Round';
import { Winner } from '@/Winner';

export type GameOverviewProps = {
    round: RoundProps;
    playerOverview: PlayerRoundOverviewsProps;
    winner?: 1 | 2;
};

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 50%;
    box-sizing: border-box;
`;

export const GameOverview = ({
    round,
    playerOverview,
    winner
}: GameOverviewProps) => (
    <StyledWrapper>
        <Round {...round} />
        <PlayerRoundOverviews {...playerOverview} />
        <Winner winner={winner} />
    </StyledWrapper>
);
