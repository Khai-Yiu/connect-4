import styled from 'styled-components';

export type MenuButtonProps = {
    text: string;
    onClick?: React.MouseEventHandler;
};

const StyledMenuButton = styled.button`
    font-size: 1.6rem;
    background-color: blue;
    color: white;
    border: 3px cyan solid;
    font-family: monospace;
    cursor: pointer;
    border-radius: 8px;

    &:hover {
        border-color: #646cff;
    }

    &:focus,
    &:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
    }
`;

const MenuButton = ({ text, onClick }: MenuButtonProps) => (
    <StyledMenuButton onClick={onClick}>{text}</StyledMenuButton>
);

export default MenuButton;
