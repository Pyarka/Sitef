import styled from "styled-components";

import arrow from '../../Assets/Images/editActive.png';

export const Container = styled.div `
    display: flex;
    flex-direction: column;
`;
export const Arrow = styled. div `
    transform: ${({isOpened}: { isOpened: boolean}) => isOpened ?"rotate(180deg)" :""};
    background-image: url(${arrow});
    width: 10px;
    height: 10px;
`;
export const IdCell = styled. div `
`;
export const NameCell = styled. div `
`;
export const SelectedIdCell = styled. div `
`;
export const SelectedNameCell = styled. div `
`;
export const SelectedCells = styled. div `
    border: 2px solid blue;
    cursor: pointer;
`;
export const AllCells = styled. div `
    border: 1px solid;
    cursor: pointer;
`;
