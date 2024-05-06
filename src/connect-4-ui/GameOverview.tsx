import styled from 'styled-components';
import {
    PlayerRoundOverviews,
    PlayerRoundOverviewsProps
} from '@/connect-4-ui/PlayerRoundOverviews';
import { Round, RoundProps } from '@/connect-4-ui/Round';
import { Status } from '@/connect-4-ui/Status';

export type GameOverviewProps = {
    round: RoundProps;
    playerOverview: PlayerRoundOverviewsProps;
    status?: 1 | 2;
};

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
`;

export const GameOverview = ({
    round,
    playerOverview,
    status
}: GameOverviewProps) => (
    <StyledWrapper>
        <Round {...round} />
        <PlayerRoundOverviews {...playerOverview} />
        <Status status={status} />
    </StyledWrapper>
);
