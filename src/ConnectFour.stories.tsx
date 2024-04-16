import { Meta, StoryObj } from '@storybook/react';
import { ConnectFour } from '@/ConnectFour';

const meta: Meta<typeof ConnectFour> = {
    component: ConnectFour
};

export default meta;

type Story = StoryObj<typeof ConnectFour>;

export const TheOneWithDefaults: Story = {
    render: () => <ConnectFour rows={6} columns={7} />
};
