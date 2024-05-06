import styled from 'styled-components';

export type StatusProps = {
    status?: 1 | 2 | 3;
};

const StyledStatus = styled.div`
    text-align: center;
    font-size: 2rem;
    background-color: blue;
    color: white;
    border-radius: 0 0 16px 16px;
    border: 3px solid black;
    border-top: none;
    width: 100%;
    padding: 12px 0;
`;

export const Status = ({ status }: StatusProps) => {
    let outcome;
    switch (status) {
        case 1:
            outcome = 'Player 1 has won!';
            break;
        case 2:
            outcome = 'Player 2 has won!';
            break;
        case 3:
            outcome = 'Game ended in a tie!';
            break;
        default:
            outcome = 'No game in progress...';
    }

    return <StyledStatus>{outcome}</StyledStatus>;
};
