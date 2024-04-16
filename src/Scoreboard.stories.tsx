import { Meta, StoryObj } from '@storybook/react';
import { Scoreboard } from '@/Scoreboard';

const meta: Meta<typeof Scoreboard> = {
    component: Scoreboard
};

export default meta;

type Story = StoryObj<typeof Scoreboard>;

export const TheOneWithDefaults: Story = {
    render: () => <Scoreboard />
};
