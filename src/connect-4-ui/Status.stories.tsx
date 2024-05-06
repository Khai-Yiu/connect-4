import { Meta, StoryObj } from '@storybook/react';
import { Status } from '@/connect-4-ui/Status';

const meta: Meta<typeof Status> = {
    component: Status
};

export default meta;

type Story = StoryObj<typeof Status>;

export const TheOneWithDefaults: Story = {
    render: () => <Status />
};

export const TheOneWithPlayerOneWinning: Story = {
    render: () => <Status status={1} />
};

export const TheOneWithPlayerTwoWinning: Story = {
    render: () => <Status status={2} />
};

export const TheOneWithATie: Story = {
    render: () => <Status status={3} />
};
