import { Meta, StoryObj } from '@storybook/react';
import { PlayerRoundOverviews } from '@/PlayerRoundOverviews';

const meta: Meta<typeof PlayerRoundOverviews> = {
    component: PlayerRoundOverviews
};

export default meta;

type Story = StoryObj<typeof PlayerRoundOverviews>;

export const TheOneWherePlayerOneIsActive: Story = {
    render: () => <PlayerRoundOverviews />
};
