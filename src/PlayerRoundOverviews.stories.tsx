import { Meta, StoryObj } from '@storybook/react';
import { PlayerRoundOverviews } from '@/PlayerRoundOverviews';
import { PlayerRoundOverviewProps } from '@/PlayerRoundOverview';

const meta: Meta<typeof PlayerRoundOverviews> = {
    component: PlayerRoundOverviews
};

export default meta;

type Story = StoryObj<typeof PlayerRoundOverviews>;

const playerOne: PlayerRoundOverviewProps = {
    player: 1,
    isActiveTurn: true,
    remainingTokens: 10,
    tokenColour: 'red'
};

const playerTwo: PlayerRoundOverviewProps = {
    player: 2,
    isActiveTurn: false,
    remainingTokens: 10,
    tokenColour: 'red'
};

export const TheOneWherePlayerOneIsActive: Story = {
    render: () => (
        <PlayerRoundOverviews
            playerOne={{ ...playerOne }}
            playerTwo={{ ...playerTwo }}
        />
    )
};

export const TheOneWherePlayerTwoIsActive: Story = {
    render: () => (
        <PlayerRoundOverviews
            playerOne={{ ...playerOne, isActiveTurn: false }}
            playerTwo={{ ...playerTwo, isActiveTurn: true }}
        />
    )
};
