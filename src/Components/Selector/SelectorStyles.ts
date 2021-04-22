import styled from "styled-components";

import arrow from '../../Assets/Images/arrow.png';

export const Container = styled.div `
    display: flex;
    flex-direction: column;
    position: relative;
`;
export const Arrow = styled. div `
    transform: ${({isOpened}: { isOpened: boolean}) => isOpened ?"rotate(270deg)" :"rotate(90deg)"};
    background-image: url(${arrow});
    margin-left: auto;
    margin-right: 5px;
    width: 16px;
    height: 16px;
`;
export const IdCell = styled. div `
    font-size: 10px;
    opacity: 0.5;
    margin: 5px;
`;
export const NameCell = styled. div `
`;
export const SelectedIdCell = styled. div `
    font-size: 10px;
    opacity: 0.5;
    margin: 5px;
`;
export const SelectedNameCell = styled. div `
`;
export const AllElementsContainer = styled. div `
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 29px;
    background-color: white;
    z-index: 1;
    width: 100%;
`;
export const SelectedCells = styled. div `
    display: flex;
    border: 2px solid blue;
    cursor: pointer;
    height: 25px;
`;
export const AllCells = styled. div `
    display: flex;
    border: 1px solid;
    cursor: pointer;
    flex-direction: row;
`;
