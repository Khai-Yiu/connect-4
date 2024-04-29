import { Meta, StoryObj } from '@storybook/react';
import { GameOverview } from '@/GameOverview';
import { RoundProps } from '@/Round';
import { PlayerRoundOverviewsProps } from '@/PlayerRoundOverviews';

const meta: Meta<typeof GameOverview> = {
    component: GameOverview
};

export default meta;

type Story = StoryObj<typeof GameOverview>;

const round: RoundProps = {
    roundNumber: 1
};

const playerOverview: PlayerRoundOverviewsProps = {
    playerOne: {
        player: 1,
        isActiveTurn: true,
        remainingTokens: 10,
        tokenColour: 'red'
    },
    playerTwo: {
        player: 2,
        isActiveTurn: false,
        remainingTokens: 10,
        tokenColour: 'red'
    }
};

export const TheOneWithPlayerOneActive: Story = {
    render: () => <GameOverview round={round} playerOverview={playerOverview} />
};

export const TheOneWithPlayerTwoActive: Story = {
    render: () => (
        <GameOverview
            round={round}
            playerOverview={{
                playerOne: { ...playerOverview.playerOne, isActiveTurn: false },
                playerTwo: { ...playerOverview.playerTwo, isActiveTurn: true }
            }}
        />
    )
};

export const TheOneWithAWinner: Story = {
    render: () => (
        <GameOverview
            round={round}
            playerOverview={playerOverview}
            winner={1}
        />
    )
};
