import { Meta, StoryObj } from '@storybook/react';
import { PlayerRoundOverview } from '@/connect-4-ui/PlayerRoundOverview';

const meta: Meta<typeof PlayerRoundOverview> = {
    component: PlayerRoundOverview
};

export default meta;

type Story = StoryObj<typeof PlayerRoundOverview>;

export const TheOneWithAPlayerNumber: Story = {
    render: () => (
        <PlayerRoundOverview
            player={2}
            remainingTokens={10}
            isActiveTurn={true}
            tokenColour="red"
        />
    )
};

export const TheOneWithAnInactivePlayer: Story = {
    render: () => (
        <PlayerRoundOverview
            player={1}
            remainingTokens={10}
            isActiveTurn={false}
            tokenColour="red"
        />
    )
};

export const TheOneWith5RemainingTokens: Story = {
    render: () => (
        <PlayerRoundOverview
            player={1}
            remainingTokens={5}
            isActiveTurn={true}
            tokenColour="red"
        />
    )
};

export const TheOneWithAPinkTokenColour: Story = {
    render: () => (
        <PlayerRoundOverview
            player={1}
            remainingTokens={10}
            isActiveTurn={true}
            tokenColour="pink"
        />
    )
};
