import { Meta, StoryObj } from '@storybook/react';
import { Board } from '@/Board';
import React from 'react';

const meta: Meta<typeof Board> = {
    component: Board
};

export default meta;

type Story = StoryObj<typeof Board>;

export const TheOneWithDefaults: Story = {
    render: () => <Board />
};

export const TheBoardWithDynamicSize: Story = {
    render: () => <Board rows={8} columns={11} />
};
