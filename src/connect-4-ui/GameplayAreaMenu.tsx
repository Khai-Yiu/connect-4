import styled from 'styled-components';
import MenuButton from '@/connect-4-ui/MenuButton';

const StyledMenu = styled.menu`
    position: sticky;
    top: 0;
    margin: 0 auto;
    padding: 0;
    width: 100%;
    background-color: #2685d9;
    min-height: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const GameplayAreaMenu = ({
    children
}: {
    children?:
        | Array<React.ReactElement<typeof MenuButton>>
        | React.ReactElement<typeof MenuButton>;
}) => {
    return <StyledMenu>{children}</StyledMenu>;
};
export default GameplayAreaMenu;
