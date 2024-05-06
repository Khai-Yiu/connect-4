import { Meta, StoryObj } from '@storybook/react';
import { GameplayArea } from '@/connect-4-ui/GameplayArea';
import createCells from '@/connect-4-ui/create-cells';
import { GameOverviewProps } from '@/connect-4-ui/GameOverview';
import { BoardProps } from '@/connect-4-ui/Board';

const meta: Meta<typeof GameplayArea> = {
    component: GameplayArea
};

export default meta;

type Story = StoryObj<typeof GameplayArea>;

const gameOverview: GameOverviewProps = {
    round: {
        roundNumber: 1
    },
    playerOverview: {
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
    },
    status: 1
};
const board: BoardProps = {
    cells: createCells(6, 7)
};

const activeGame = {
    gameOverview: gameOverview,
    board: board
};

export const TheOneWithDefaults: Story = {
    render: () => <GameplayArea />
};

export const TheOneWithAGameInProgress: Story = {
    render: () => <GameplayArea activeGame={activeGame} />
};
