import { Meta, StoryObj } from '@storybook/react';
import { Winner } from '@/Winner';

const meta: Meta<typeof Winner> = {
    component: Winner
};

export default meta;

type Story = StoryObj<typeof Winner>;

export const TheOneWithDefaults: Story = {
    render: () => <Winner />
};

export const TheOneWithPlayerOneWinning: Story = {
    render: () => <Winner winner={1} />
};

export const TheOneWithPlayerTwoWinning: Story = {
    render: () => <Winner winner={2} />
};
