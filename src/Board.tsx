import styled from 'styled-components';
import { BoardCellProps } from '@/BoardCell';
import React from 'react';

export type BoardProps = {
    cells: Array<Array<typeof BoardCellProps>>;
    rows?: number;
    columns?: number;
};

export const Board = (props: BoardProps) => <></>;

Board.defaultProps = {
    cells: createCells(6, 7)
};
