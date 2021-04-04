import styled from "styled-components";
import cross from '../../Assets/Images/cross.png';
import crossActive from '../../Assets/Images/crossActive.png';

export const ScaleStyle = styled.div`
  color: #00a9bb;
  text-align: end;
  width: 15px;
  padding: 0 10px 0 0;
`;

export const ContainerVertical = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    width: 300px;
    border: 1px solid;
`;

export const HeaderBlock = styled.div`
    display: flex;
    flex-direction: row;
`;

export const CloseButton = styled.div`
    height: 11px;
    width: 11px;
    display: flex;
    flex-shrink: 0;
    background-image: url(${cross});
    cursor: pointer;
     &:hover {
        background-image: url(${crossActive});
    }
`;

export const ContainerHorizontal = styled.div`
  display: flex;
  width: auto;
`;

export const ToggleEdit = styled.div`
    cursor: pointer;
    width: 30px;
    height: 30px;
    background-color: green;
    border-radius: 50%;
`;
export const ToggleSave = styled.div`
    cursor: pointer;
    width: 30px;
    height: 30px;
    background-color: blue;
    border-radius: 50%;
`
export const ToggleCancel = styled.div`
    cursor: pointer;
    width: 30px;
    height: 30px;
    background-color: red;
    border-radius: 50%;
`;
export const ToggleVertical = styled.div`
    width: 30px;
    height: 30px;
    border: 10px;
    border-radius: 50%;
    border-color: green;
    cursor: pointer;
`;
export const ToggleHorizontal = styled.div`
    width: 30px;
    height: 30px;
    border: 5px;
    border-radius: 50%;
    border-color: blue;
    cursor: pointer;
`;
export const ToggleBlock = styled.div`
    display: flex;
    border: 1px solid #ececec;
    cursor: pointer;
`;
export const CellsContainer = styled.div`
    width: 210px;
    box-shadow: 0 0 5px 1px rgb(0.0.0.0) ;
    display: flex;
    flex-direction: column;
`;
export const CellsRow = styled.div`
    width: 150px;
    height: 25px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    margin-bottom: 3px;
    margin-top: 3px;
`;
export const CellsValues = styled.div`
    text-align: start;
    width: 100px;
`;



