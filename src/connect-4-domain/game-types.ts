import InMemoryRepository from '@/connect-4-domain/in-memory-repository';

export type BoardCell = {
    player: 1 | 2 | undefined;
};

export type Board = Array<Array<BoardCell>>;

export type PlayerMove = {
    player: 1 | 2;
    targetCell: {
        row: number;
        column: number;
    };
};

export type BoardDimensions = {
    rows: number;
    columns: number;
};

export type PlayerNumber = 1 | 2;

export type PlayerStats = {
    playerNumber: 1 | 2;
    remainingDiscs: number;
};

export type ValidationResult = {
    isValid: boolean;
    message: string;
};

export type ValidCellOnBoard = {
    isValidRow: boolean;
    isValidColumn: boolean;
};

export type BoardUuid = `${string}-${string}-${string}-${string}-${string}`;

export type GameRepository = InMemoryRepository | undefined;

export type GameParameters = {
    boardDimensions?: { rows: number; columns: number };
    repository?: GameRepository;
};
