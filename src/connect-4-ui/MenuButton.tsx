import styled from 'styled-components';

export type MenuButtonProps = {
    text: string;
    onClick?: React.MouseEventHandler;
};

const StyledMenuButton = styled.button`
    font-size: 1.6rem;
    width: 200px;
    background-color: inherit;
    color: white;
    font-family: monospace;
    cursor: pointer;
    outline: none;
    border: none;

    &:hover {
        background-color: #a2a8d3;
    }
`;

const MenuButton = ({ text, onClick }: MenuButtonProps) => (
    <StyledMenuButton onClick={onClick}>{text}</StyledMenuButton>
);

export default MenuButton;
