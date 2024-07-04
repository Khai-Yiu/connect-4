import { Meta, StoryObj } from '@storybook/react';
import SavedGame from '@/connect-4-ui/SavedGame';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof SavedGame> = {
    component: SavedGame
};

export default meta;

type Story = StoryObj<typeof SavedGame>;

export const TheOneWithDefaults: Story = {
    render: () => (
        <SavedGame gameId={crypto.randomUUID()} savedDate={new Date()} />
    )
};

export const TheOneWithALoadClick: Story = {
    render: () => (
        <SavedGame
            gameId={crypto.randomUUID()}
            savedDate={new Date()}
            handleLoadGame={action('Clicked here')}
        />
    )
};
